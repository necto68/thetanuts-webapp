import type { FC } from "react";
import { createContext } from "react";

import { useBasicModalProviderState } from "../hooks/useBasicModalProviderState";
import type { BasicModalState } from "../types";
import { TabType } from "../types";

const defaultBasicModalState: BasicModalState = {
  tabType: TabType.deposit,
  setTabType: () => undefined,
  inputValue: "",
  setInputValue: () => undefined,
  isUseNativeData: false,
  setIsUseNativeData: () => undefined,
  tokenData: undefined,
  isTokenDataLoading: false,
  nativeData: undefined,
  isNativeDataLoading: false,
  priceValue: 0,
  remainderValue: 0,

  tokensQueries: {
    collateralTokenQuery: undefined,
    basicVaultTokenQuery: undefined,
    nativeTokenQuery: undefined,
  },
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
