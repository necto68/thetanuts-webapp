import type { UseMutationResult } from "react-query";

import type { MutationError } from "../../index-vault-modal/types";

export interface LendingMarketModalMutations {
  approveDelegationMutation?: UseMutationResult<boolean, MutationError, void>;
  openPositionMutation?: UseMutationResult<boolean, MutationError, void>;
  cancelPendingPositionMutation?: UseMutationResult<
    boolean,
    MutationError,
    void
  >;
  closePositionAndWithdrawMutation?: UseMutationResult<
    boolean,
    MutationError,
    void
  >;

  mutationHash?: string;

  runApproveDelegation: () => void;
  runOpenPosition: () => void;
  runCancelPendingPosition: () => void;
  runClosePositionAndWithdraw: () => void;
}
