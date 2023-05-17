import type { FC } from "react";
import { createContext } from "react";

import { useBoostModalProviderMutations } from "../hooks/useBoostModalProviderMutations";
import type { BoostModalMutations } from "../types";

const defaultBoostModalMutations: BoostModalMutations = {
  approveLpoolAllowanceMutation: undefined,
  boostMutation: undefined,
  unboostMutation: undefined,

  boostHash: undefined,
  resetBoostHash: () => undefined,

  runApproveLpoolAllowance: () => undefined,
  runBoost: () => undefined,
  runUnboost: () => undefined,
};

export const BoostModalMutationsContext = createContext<BoostModalMutations>(
  defaultBoostModalMutations
);

export const BoostModalMutationsProvider: FC = ({ children }) => {
  const boostModalProviderMutations = useBoostModalProviderMutations();

  return (
    <BoostModalMutationsContext.Provider value={boostModalProviderMutations}>
      {children}
    </BoostModalMutationsContext.Provider>
  );
};
