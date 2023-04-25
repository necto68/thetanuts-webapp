import type { FC } from "react";
import { useMemo, useState, createContext } from "react";

import { ClosePositionTabType } from "../types";
import type { ClosePositionModalState } from "../types";

const defaultClosePositionModalState: ClosePositionModalState = {
  tabType: ClosePositionTabType.uponExpiry,
  setTabType: () => undefined,
};

export const ClosePositionModalStateContext =
  createContext<ClosePositionModalState>(defaultClosePositionModalState);

export const ClosePositionModalStateProvider: FC = ({ children }) => {
  const [tabType, setTabType] = useState<ClosePositionTabType>(
    ClosePositionTabType.uponExpiry
  );

  const closePositionModalProviderState = useMemo(
    () => ({
      tabType,
      setTabType,
    }),
    [tabType, setTabType]
  );

  return (
    <ClosePositionModalStateContext.Provider
      value={closePositionModalProviderState}
    >
      {children}
    </ClosePositionModalStateContext.Provider>
  );
};
