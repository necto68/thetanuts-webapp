import type { FC } from "react";
import { createContext } from "react";

import { useBasicModalProviderMutations } from "../hooks/useBasicModalProviderMutations";
import type { BasicModalMutations } from "../types";

const defaultBasicModalMutations: BasicModalMutations = {
  approveAllowanceMutation: undefined,
  depositMutation: undefined,
  initWithdrawMutation: undefined,
  withdrawMutation: undefined,

  mutationHash: undefined,

  runApproveAllowance: () => undefined,
  runDeposit: () => undefined,
  runInitWithdraw: () => undefined,
  runWithdraw: () => undefined,
};

export const BasicModalMutationsContext = createContext<BasicModalMutations>(
  defaultBasicModalMutations
);

export const BasicModalMutationsProvider: FC = ({ children }) => {
  const basicModalProviderMutations = useBasicModalProviderMutations();

  return (
    <BasicModalMutationsContext.Provider value={basicModalProviderMutations}>
      {children}
    </BasicModalMutationsContext.Provider>
  );
};
