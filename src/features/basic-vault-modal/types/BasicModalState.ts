import type { UseQueryResult } from "react-query";

import type { NativeToken, Token } from "../../index-vault-modal/types";

import type { TabType } from "./TabType";

export interface BasicModalState {
  tabType: TabType;
  setTabType: (tabType: TabType) => void;

  inputValue: string;
  setInputValue: (inputValue: string) => void;

  isUseNativeData: boolean;
  setIsUseNativeData: (isUseNativeData: boolean) => void;

  tokenData?: Token;
  isTokenDataLoading: boolean;

  nativeData?: NativeToken;
  isNativeDataLoading: boolean;

  priceValue: number;
  remainderValue: number;

  tokensQueries: {
    collateralTokenQuery?: UseQueryResult<Token>;
    basicVaultTokenQuery?: UseQueryResult<Token>;
    nativeTokenQuery?: UseQueryResult<NativeToken>;
  };
}
