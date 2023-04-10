import type { FC } from "react";
import { createContext } from "react";

import { useBasicModalProviderMutations } from "../hooks/useBasicModalProviderMutations";
import type { BasicModalMutations } from "../types";


const defaultBasicModalMutations: BasicModalMutations = {
  approveAllowanceMutation: undefined,
  wrapMutation: undefined,
  depositMutation: undefined,
  cancelDepositMutation: undefined,
  initWithdrawMutation: undefined,
  initFullWithdrawMutation: undefined,
  cancelWithdrawMutation: undefined,
  withdrawMutation: undefined,
  approveLpoolAllowanceMutation: undefined,
  boostMutation: undefined,
  unboostMutation: undefined,

  mutationHash: undefined,
  boostHash: undefined,

  runApproveAllowance: () => undefined,
  runWrap: () => undefined,
  runDeposit: () => undefined,
  runCancelDeposit: () => undefined,
  runInitWithdraw: () => undefined,
  runInitFullWithdraw: () => undefined,
  runCancelWithdraw: () => undefined,
  runWithdraw: () => undefined,
  runApproveLpoolAllowance: () => undefined,
  runBoost: () => undefined,
  runUnboost: () => undefined,
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
