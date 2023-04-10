import type { SwapRouterState } from "../../index-vault-modal/types";

export interface BasicModalState {
  inputValue: SwapRouterState["sourceValue"];
  setInputValue: SwapRouterState["setSourceValue"];

  isUseNativeData: SwapRouterState["isUseNativeSourceData"];
  setIsUseNativeData: SwapRouterState["setUseSourceNativeData"];

  tokenData: SwapRouterState["sourceData"];
  isTokenDataLoading: SwapRouterState["isSourceDataLoading"];

  nativeData?: SwapRouterState["nativeData"];
  isNativeDataLoading: SwapRouterState["isNativeDataLoading"];

  priceValue: SwapRouterState["sourcePrice"];
  minInputValue: SwapRouterState["minInputValue"];
  maxInputValue: SwapRouterState["maxInputValue"];

  tokensQueries: {
    collateralTokenQuery: SwapRouterState["tokensQueries"]["sourceTokenQuery"];
    nativeTokenQuery: SwapRouterState["tokensQueries"]["nativeTokenQuery"];
  };
  
  activePositionData: SwapRouterState["activePositionData"];
}
