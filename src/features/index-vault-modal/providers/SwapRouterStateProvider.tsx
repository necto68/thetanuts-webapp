import type { FC } from "react";
import { createContext } from "react";

import { useSwapRouterProviderState } from "../hooks/useSwapRouterProviderState";
import type { SwapRouterState } from "../types";
import { InputType } from "../types";

const defaultSwapRouterState: SwapRouterState = {
  sourceValue: "",
  targetValue: "",

  setSourceValue: () => undefined,
  setTargetValue: () => undefined,

  isSourceValueLoading: false,
  isTargetValueLoading: false,

  sourceData: undefined,
  targetData: undefined,
  nativeData: undefined,

  isSourceDataLoading: false,
  isTargetDataLoading: false,
  isNativeDataLoading: false,

  setUseSourceNativeData: () => undefined,
  setUseTargetNativeData: () => undefined,

  isUseNativeSourceData: false,
  isUseNativeTargetData: false,

  lastUpdatedInputType: InputType.source,

  isDirectModeBetterThanSwapMode: false,
  isUseDirectMode: false,

  sourcePrice: 0,
  targetPrice: 0,
  priceImpactRate: 0,

  isFlipped: false,
  swapInputs: () => undefined,

  tokensQueries: {
    sourceTokenQuery: undefined,
    targetTokenQuery: undefined,
    nativeTokenQuery: undefined,
  },
};

export const SwapRouterStateContext = createContext<SwapRouterState>(
  defaultSwapRouterState
);

export const SwapRouterStateProvider: FC = ({ children }) => {
  const swapRouterProviderState = useSwapRouterProviderState();

  return (
    <SwapRouterStateContext.Provider value={swapRouterProviderState}>
      {children}
    </SwapRouterStateContext.Provider>
  );
};
