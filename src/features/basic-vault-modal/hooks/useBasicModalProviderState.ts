import { useEffect, useState } from "react";
import Big from "big.js";
import { constants } from "ethers";

import type { BasicModalState } from "../types";
import { TabType } from "../types";
import {
  useNativeTokenQuery,
  useTokenQuery,
} from "../../index-vault-modal/hooks";
import type { Token } from "../../index-vault-modal/types";
import { convertToBig } from "../../shared/helpers";
import { useLongModalConfig } from "../../long-vault-modal/hooks/useLongModalConfig";
import { BasicVaultType } from "../../basic/types";
import { useVaultModalState } from "../../modal/hooks";
import { LPOOL_ADDRESS, lendingPoolTokenAddresses } from "../constants";

import { useBasicModalConfig } from "./useBasicModalConfig";

// eslint-disable-next-line complexity
export const useBasicModalProviderState = (): BasicModalState => {
  const [vaultModalState] = useVaultModalState();
  const { tabType, isBoostContentShown, vaultId } = vaultModalState;
  const [inputValue, setInputValue] = useState("");
  const [isUseNativeData, setIsUseNativeData] = useState(false);

  useEffect(() => {
    setInputValue("");
    setIsUseNativeData(false);
  }, [tabType]);
  const {
    collateralTokenAddress,
    routerAddress,
    spenderAddress,
    provider,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();

  // for boosting - get vault address instead of native token
  let updatedCollateralTokenAddress = collateralTokenAddress;
  if (isBoostContentShown && tabType === "deposit") {
    updatedCollateralTokenAddress = spenderAddress;
    // eslint-disable-next-line sonarjs/elseif-without-else
  } else if (isBoostContentShown && tabType === "withdraw") {
    const lendingPoolToken = lendingPoolTokenAddresses.find(
      (token) => token.id === vaultId
    );
    if (lendingPoolToken) {
      updatedCollateralTokenAddress =
        lendingPoolToken.source.suppliedTokenAddress;
    }
  }

  const updatedSpenderAddress = isBoostContentShown
    ? LPOOL_ADDRESS
    : spenderAddress;

  const { longVaultReaderQuery } = useLongModalConfig();

  const inputValueBig = new Big(inputValue || 0);

  const { data: basicVaultData } = basicVaultQuery;
  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const { data: longVaultReaderData } = longVaultReaderQuery;

  const {
    basicVaultType = BasicVaultType.BASIC,
    collateralPrice = 0,
    valuePerLP = new Big(1),
    remainder: collateralTokenRemainder = Number.MAX_SAFE_INTEGER,
  } = basicVaultData ?? {};

  const { lpBalance = new Big(0) } = basicVaultReaderData ?? {};

  const { minSupplyValue = 0, maxSupplyValue = Number.MAX_SAFE_INTEGER } =
    longVaultReaderData ?? {};

  const collateralTokenQuery = useTokenQuery(
    updatedCollateralTokenAddress,
    updatedSpenderAddress,
    provider
  );

  const nativeTokenQuery = useNativeTokenQuery(routerAddress, provider);

  const { data: collateralTokenData, isLoading: isTokenDataLoading } =
    collateralTokenQuery;

  const { data: nativeData, isLoading: isNativeDataLoading } = nativeTokenQuery;

  const lpDivisor = new Big(10).pow(18);
  const withdrawalTokenDivisor = collateralTokenData?.tokenDivisor ?? lpDivisor;

  const withdrawalTokenBalance =
    lpBalance
      ?.mul(valuePerLP)
      .mul(lpDivisor)
      .round()
      .div(withdrawalTokenDivisor) ?? null;

  const withdrawalTokenData: Token | undefined = collateralTokenData
    ? {
        ...collateralTokenData,
        balance: withdrawalTokenBalance,
        allowance: convertToBig(constants.MaxUint256),
      }
    : undefined;

  const lpToken = lendingPoolTokenAddresses.find(
    (token) => token.id === vaultId
  );
  const lpTokenAddress = lpToken?.source.suppliedTokenAddress ?? "";

  const activePositionQuery = useTokenQuery(
    lpTokenAddress,
    updatedSpenderAddress,
    provider
  );

  const { data: activePositionData } = activePositionQuery;

  const tokenData =
    tabType === TabType.withdraw && !isBoostContentShown
      ? withdrawalTokenData
      : collateralTokenData;

  // use the same price for Deposit/Withdraw tab
  const priceValue = inputValueBig.mul(collateralPrice).toNumber();

  let minInputValue: number | undefined = 0;
  let maxInputValue: number | undefined = Number.MAX_SAFE_INTEGER;

  if (tabType === TabType.deposit) {
    minInputValue = basicVaultType === BasicVaultType.LONG ? minSupplyValue : 0;

    maxInputValue =
      basicVaultType === BasicVaultType.LONG
        ? maxSupplyValue
        : collateralTokenRemainder;
  } else {
    minInputValue = undefined;
    maxInputValue = undefined;
  }

  return {
    inputValue,
    setInputValue,

    isUseNativeData,
    setIsUseNativeData,

    tokenData,
    isTokenDataLoading,

    nativeData,
    isNativeDataLoading,

    priceValue,
    minInputValue,
    maxInputValue,

    tokensQueries: {
      collateralTokenQuery,
      nativeTokenQuery,
    },

    activePositionData,
  };
};
