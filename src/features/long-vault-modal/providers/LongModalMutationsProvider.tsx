import type { FC } from "react";
import { createContext } from "react";

import { useLongModalProviderMutations } from "../hooks/useLongModalProviderMutations";
import type { LongModalMutations } from "../types";

const defaultLongModalMutations: LongModalMutations = {
  approveDelegationMutation: undefined,
  openPositionMutation: undefined,
  openPositionImmediatelyMutation: undefined,
  cancelPendingPositionMutation: undefined,
  closePositionAndWithdrawMutation: undefined,

  mutationHash: undefined,

  runApproveDelegation: () => undefined,
  runOpenPosition: () => undefined,
  runOpenPositionImmediately: () => undefined,
  runCancelPendingPosition: () => undefined,
  runClosePositionAndWithdraw: () => undefined,
  runClosePositionAndWithdrawImmediately: () => undefined,
};

export const LongModalMutationsContext = createContext<LongModalMutations>(
  defaultLongModalMutations
);

export const LongModalMutationsProvider: FC = ({ children }) => {
  const longModalProviderMutations = useLongModalProviderMutations();

  return (
    <LongModalMutationsContext.Provider value={longModalProviderMutations}>
      {children}
    </LongModalMutationsContext.Provider>
  );
};
