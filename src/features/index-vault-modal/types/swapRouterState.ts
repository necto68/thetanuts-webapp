import type { UseQueryResult } from "react-query";

import type { ChainId } from "../../wallet/constants";

import type { InputType } from "./inputType";
import type { NativeToken, Token } from "./token";

export interface SwapRouterState {
  sourceValue: string;
  targetValue: string;

  setSourceValue: (inputValue: string) => void;
  setTargetValue: (inputValue: string) => void;

  isSourceValueLoading: boolean;
  isTargetValueLoading: boolean;

  sourceData?: Token;
  targetData?: Token;
  nativeData?: NativeToken;

  isSourceDataLoading: boolean;
  isTargetDataLoading: boolean;
  isNativeDataLoading: boolean;

  setUseSourceNativeData: (value: boolean) => void;
  setUseTargetNativeData: (value: boolean) => void;

  isUseNativeSourceData: boolean;
  isUseNativeTargetData: boolean;

  lastUpdatedInputType: InputType;

  isDirectModeBetterThanSwapMode: boolean;
  isUseDirectMode: boolean;

  sourcePrice: number;
  targetPrice: number;
  priceImpactRate: number;

  minInputValue?: number;
  maxInputValue?: number;
  vaultChainId?: ChainId;

  slippageToleranceValue: string;
  slippageToleranceInputValue: string;
  setSlippageToleranceInputValue: (value: string) => void;

  isFlipped: boolean;
  swapInputs: () => void;

  tokensQueries: {
    sourceTokenQuery?: UseQueryResult<Token>;
    targetTokenQuery?: UseQueryResult<Token>;
    nativeTokenQuery?: UseQueryResult<NativeToken>;
  };

  activePositionData?: Token;
}
