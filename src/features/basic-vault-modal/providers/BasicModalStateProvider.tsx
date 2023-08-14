import type { FC } from "react";
import { createContext } from "react";

// eslint-disable-next-line import/no-cycle
import { useBasicModalProviderState } from "../hooks/useBasicModalProviderState";
import type { BasicModalState } from "../types";

const defaultBasicModalState: BasicModalState = {
  inputValue: "",
  setInputValue: () => undefined,
  isUseNativeData: false,
  setIsUseNativeData: () => undefined,
  tokenData: undefined,
  isTokenDataLoading: false,
  nativeData: undefined,
  isNativeDataLoading: false,
  priceValue: 0,
  minInputValue: 0,
  maxInputValue: 0,

  tokensQueries: {
    collateralTokenQuery: undefined,
    nativeTokenQuery: undefined,
  },

  activePositionData: undefined,
};

export const BasicModalStateContext = createContext<BasicModalState>(
  defaultBasicModalState
);

export const BasicModalStateProvider: FC = ({ children }) => {
  const basicModalProviderState = useBasicModalProviderState();

  return (
    <BasicModalStateContext.Provider value={basicModalProviderState}>
      {children}
    </BasicModalStateContext.Provider>
  );
};
