import type { FC } from "react";
import { createContext } from "react";

import { useBasicModalProviderState } from "../hooks/useBasicModalProviderState";
import type { BasicModalState } from "../types";
import { TabType } from "../types";

const defaultBasicModalState: BasicModalState = {
  tabType: TabType.deposit,
  setTabType: () => undefined,
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
