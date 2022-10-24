import type { FC } from "react";
import { createContext } from "react";

import { useLendingMarketModalProviderMutations } from "../hooks/useLendingMarketModalProviderMutations";
import type { LendingMarketModalMutations } from "../types";

const defaultLendingMarketModalMutations: LendingMarketModalMutations = {
  openPositionMutation: undefined,
  closePositionAndWithdrawMutation: undefined,

  mutationHash: undefined,

  runOpenPosition: () => undefined,
  runClosePositionAndWithdraw: () => undefined,
};

export const LendingMarketModalMutationsContext =
  createContext<LendingMarketModalMutations>(
    defaultLendingMarketModalMutations
  );

export const LendingMarketModalMutationsProvider: FC = ({ children }) => {
  const lendingMarketModalProviderMutations =
    useLendingMarketModalProviderMutations();

  return (
    <LendingMarketModalMutationsContext.Provider
      value={lendingMarketModalProviderMutations}
    >
      {children}
    </LendingMarketModalMutationsContext.Provider>
  );
};
