import { useCallback, useState } from "react";
import Big from "big.js";

import type { BasicModalState } from "../types";
import { TabType } from "../types";
import {
  useNativeTokenQuery,
  useTokenQuery,
} from "../../index-vault-modal/hooks";

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
    basicVaultAddress,
    collateralTokenAddress,
    routerAddress,
    provider,
    basicVaultQuery,
  } = useBasicModalConfig();

  const { data } = basicVaultQuery;

  const inputValueBig = new Big(inputValue || 0);

  const {
    collateralPrice = 0,
    remainder: collateralTokenRemainder = 999_999_999,
  } = data ?? {};

  const collateralTokenQuery = useTokenQuery(
    collateralTokenAddress,
    basicVaultAddress,
    provider
  );

  // TODO: use another special hook, we don't need plain useTokenQuery here
  const basicVaultTokenQuery = useTokenQuery(
    basicVaultAddress,
    basicVaultAddress,
    provider
  );

  const nativeTokenQuery = useNativeTokenQuery(routerAddress, provider);

  const { data: collateralTokenData, isLoading: isCollateralTokenDataLoading } =
    collateralTokenQuery;
  const { data: basicVaultTokenData, isLoading: isBasicVaultTokenLoading } =
    basicVaultTokenQuery;
  const { data: nativeData, isLoading: isNativeDataLoading } = nativeTokenQuery;

  const tokenData =
    currentTabType === TabType.deposit
      ? collateralTokenData
      : basicVaultTokenData;
  const isTokenDataLoading =
    currentTabType === TabType.deposit
      ? isCollateralTokenDataLoading
      : isBasicVaultTokenLoading;

  const priceValue = inputValueBig.mul(collateralPrice).toNumber();

  const remainderValue =
    currentTabType === TabType.deposit ? collateralTokenRemainder : undefined;

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
      basicVaultTokenQuery,
      nativeTokenQuery,
    },
  };
};
