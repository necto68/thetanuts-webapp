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
import { ModalContentType } from "../../index-vault-modal/types";
import { convertToBig } from "../../shared/helpers";
import { useLongModalConfig } from "../../long-vault-modal/hooks/useLongModalConfig";
import { BasicVaultType } from "../../basic/types";
import { useVaultModalState } from "../../modal/hooks";
import { VaultModalType } from "../../root/types";
import { getLongOptionTokenSymbol } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";
import {
  lendingPoolAddresses,
  lendingPoolTokenAddresses,
} from "../../boost/constants";

import { useBasicModalConfig } from "./useBasicModalConfig";

// eslint-disable-next-line complexity
export const useBasicModalProviderState = (): BasicModalState => {
  const [vaultModalState] = useVaultModalState();
  const { tabType, isBoostContentShown, vaultId, vaultType, contentType } =
    vaultModalState;
  const [inputValue, setInputValue] = useState("");
  const [isUseNativeData, setIsUseNativeData] = useState(false);

  useEffect(() => {
    setInputValue("");
    setIsUseNativeData(false);
  }, [tabType]);
  const {
    walletChainId,
    collateralTokenAddress,
    routerAddress,
    spenderAddress,
    provider,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();

  // for boosting - get vault address instead of native token
  let updatedCollateralTokenAddress = collateralTokenAddress;
  if (isBoostContentShown && tabType === TabType.deposit) {
    updatedCollateralTokenAddress = spenderAddress;
    // eslint-disable-next-line sonarjs/elseif-without-else
  } else if (isBoostContentShown && tabType === TabType.withdraw) {
    const lendingPoolToken = lendingPoolTokenAddresses.find(
      (token) => token.id === vaultId
    );
    if (lendingPoolToken) {
      updatedCollateralTokenAddress =
        lendingPoolToken.source.suppliedTokenAddress;
    }
  }

  const updatedSpenderAddress = isBoostContentShown
    ? lendingPoolAddresses[walletChainId]
    : spenderAddress;

  const { longVaultReaderQuery } = useLongModalConfig();

  const inputValueBig = new Big(inputValue || 0);

  const { data: basicVaultData } = basicVaultQuery;
  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const { data: longVaultReaderData } = longVaultReaderQuery;

  const {
    type = VaultType.CALL,
    basicVaultType = BasicVaultType.BASIC,
    assetSymbol = "",
    collateralPrice = 0,
    valuePerLP = new Big(1),
    remainder: collateralTokenRemainder = Number.MAX_SAFE_INTEGER,
  } = basicVaultData ?? {};

  const { lpBalance = new Big(0) } = basicVaultReaderData ?? {};

  const {
    minSupplyValue = 0,
    maxSupplyValue = Number.MAX_SAFE_INTEGER,
    debtToken,
    debtTokenPrice = 0,
  } = longVaultReaderData ?? {};

  const collateralTokenQuery = useTokenQuery(
    updatedCollateralTokenAddress,
    updatedSpenderAddress,
    provider
  );

  const nativeTokenQuery = useNativeTokenQuery(routerAddress, provider);

  const { data: collateralTokenData, isLoading: isTokenDataLoading } =
    collateralTokenQuery;

  const { data: nativeData, isLoading: isNativeDataLoading } = nativeTokenQuery;

  // only for LongOptionModal and LongOptionPositionModal
  const isLongVault = basicVaultType === BasicVaultType.LONG;
  const isLongOptionModal = [
    VaultModalType.longCall,
    VaultModalType.longPut,
    VaultModalType.longPosition,
  ].includes(vaultType);
  const isLongOptionClosePositionModal =
    vaultType === VaultModalType.longPosition &&
    contentType === ModalContentType.closeLongOptionPosition;

  const debtTokenData: Token | undefined = debtToken
    ? {
        ...debtToken,
        symbol: getLongOptionTokenSymbol(type, assetSymbol),
        allowance: convertToBig(constants.MaxUint256),
      }
    : undefined;

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

  let tokenData = collateralTokenData;
  let tokenPrice = collateralPrice;
  if (isLongOptionClosePositionModal) {
    tokenData = debtTokenData;

    // use debtTokenPrice for LongOptionClosePositionModal
    // but the same price for Deposit/Withdraw tab
    tokenPrice = debtTokenPrice;
  } else if (tabType === TabType.deposit) {
    tokenData = collateralTokenData;
  } else if (!isBoostContentShown) {
    tokenData = withdrawalTokenData;
  } else {
    tokenData = collateralTokenData;
  }

  const priceValue = inputValueBig.mul(tokenPrice).toNumber();

  let minInputValue: number | undefined = 0;
  let maxInputValue: number | undefined = Number.MAX_SAFE_INTEGER;

  if (tabType === TabType.deposit) {
    minInputValue = isLongVault && !isLongOptionModal ? minSupplyValue : 0;
    maxInputValue = isLongVault ? maxSupplyValue : collateralTokenRemainder;
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
