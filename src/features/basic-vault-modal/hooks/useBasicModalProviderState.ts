import { useCallback, useState } from "react";
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
import { useLendingMarketModalConfig } from "../../lending-market-vault-modal/hooks/useLendingMarketModalConfig";
import { BasicVaultType } from "../../basic/types";

import { useBasicModalConfig } from "./useBasicModalConfig";

export const useBasicModalProviderState = (): BasicModalState => {
  const [currentTabType, setCurrentTabType] = useState(TabType.deposit);
  const [inputValue, setInputValue] = useState("");
  const [isUseNativeData, setIsUseNativeData] = useState(false);

  const tabType = currentTabType;
  const setTabType = useCallback((nextTabType: TabType) => {
    setInputValue("");
    setIsUseNativeData(false);
    setCurrentTabType(nextTabType);
  }, []);

  const {
    collateralTokenAddress,
    routerAddress,
    spenderAddress,
    provider,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { lendingMarketVaultReaderQuery } = useLendingMarketModalConfig();

  const inputValueBig = new Big(inputValue || 0);

  const { data: basicVaultData } = basicVaultQuery;
  const { data: basicVaultReaderData } = basicVaultReaderQuery;
  const { data: lendingMarketVaultReaderData } = lendingMarketVaultReaderQuery;

  const {
    basicVaultType = BasicVaultType.BASIC,
    collateralPrice = 0,
    remainder: collateralTokenRemainder = Number.MAX_SAFE_INTEGER,
  } = basicVaultData ?? {};

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const { supplyRemainder = Number.MAX_SAFE_INTEGER } =
    lendingMarketVaultReaderData ?? {};

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
    currentTabType === TabType.deposit
      ? collateralTokenData
      : withdrawalTokenData;

  // use the same price for Deposit/Withdraw tab
  const priceValue = inputValueBig.mul(collateralPrice).toNumber();

  let remainderValue: number | undefined = Number.MAX_SAFE_INTEGER;

  if (currentTabType === TabType.deposit) {
    remainderValue =
      basicVaultType === BasicVaultType.LENDING_MARKET
        ? supplyRemainder
        : collateralTokenRemainder;
  } else {
    remainderValue = undefined;
  }

  return {
    tabType,
    setTabType,

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
