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

import { useBasicModalConfig } from "./useBasicModalConfig";

export const useBasicModalProviderState = (): BasicModalState => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;
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
  const { longVaultReaderQuery } = useLongModalConfig();

  const inputValueBig = new Big(inputValue || 0);

  const { data: basicVaultData } = basicVaultQuery;
  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const { data: longVaultReaderData } = longVaultReaderQuery;

  const {
    basicVaultType = BasicVaultType.BASIC,
    collateralPrice = 0,
    remainder: collateralTokenRemainder = Number.MAX_SAFE_INTEGER,
  } = basicVaultData ?? {};

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const { supplyRemainder = Number.MAX_SAFE_INTEGER } =
    longVaultReaderData ?? {};

  const collateralTokenQuery = useTokenQuery(
    collateralTokenAddress,
    spenderAddress,
    provider
  );

  const nativeTokenQuery = useNativeTokenQuery(routerAddress, provider);

  const { data: collateralTokenData, isLoading: isTokenDataLoading } =
    collateralTokenQuery;

  const { data: nativeData, isLoading: isNativeDataLoading } = nativeTokenQuery;

  const withdrawalTokenData: Token | undefined = collateralTokenData
    ? {
        ...collateralTokenData,
        balance: currentPosition,
        allowance: convertToBig(constants.MaxUint256),
      }
    : undefined;

  const tokenData =
    tabType === TabType.deposit ? collateralTokenData : withdrawalTokenData;

  // use the same price for Deposit/Withdraw tab
  const priceValue = inputValueBig.mul(collateralPrice).toNumber();

  let remainderValue: number | undefined = Number.MAX_SAFE_INTEGER;

  if (tabType === TabType.deposit) {
    remainderValue =
      basicVaultType === BasicVaultType.LONG
        ? supplyRemainder
        : collateralTokenRemainder;
  } else {
    remainderValue = undefined;
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
    remainderValue,

    tokensQueries: {
      collateralTokenQuery,
      nativeTokenQuery,
    },
  };
};
