import type { SwapRouterState } from "../../index-vault-modal/types";

import type { TabType } from "./TabType";

export interface BasicModalState {
  tabType: TabType;
  setTabType: (tabType: TabType) => void;

  inputValue: SwapRouterState["sourceValue"];
  setInputValue: SwapRouterState["setSourceValue"];

  isUseNativeData: SwapRouterState["isUseNativeSourceData"];
  setIsUseNativeData: SwapRouterState["setUseSourceNativeData"];

  tokenData: SwapRouterState["sourceData"];
  isTokenDataLoading: SwapRouterState["isSourceDataLoading"];

  nativeData?: SwapRouterState["nativeData"];
  isNativeDataLoading: SwapRouterState["isNativeDataLoading"];

  priceValue: SwapRouterState["sourcePrice"];
  remainderValue: SwapRouterState["remainderValue"];

  tokensQueries: {
    collateralTokenQuery: SwapRouterState["tokensQueries"]["sourceTokenQuery"];
    basicVaultTokenQuery: SwapRouterState["tokensQueries"]["sourceTokenQuery"];
    nativeTokenQuery: SwapRouterState["tokensQueries"]["nativeTokenQuery"];
  };
}
