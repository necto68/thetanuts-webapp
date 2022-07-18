import type { UseMutationResult } from "react-query";

import type { MutationError } from "../../index-vault-modal/types";

export interface BasicModalMutations {
  approveAllowanceMutation?: UseMutationResult<boolean, MutationError, void>;
  depositMutation?: UseMutationResult<boolean, MutationError, void>;
  initWithdrawMutation?: UseMutationResult<boolean, MutationError, void>;
  cancelWithdrawMutation?: UseMutationResult<boolean, MutationError, void>;
  withdrawMutation?: UseMutationResult<boolean, MutationError, void>;

  mutationHash?: string;

  runApproveAllowance: () => void;
  runDeposit: () => void;
  runInitWithdraw: () => void;
  runCancelWithdraw: () => void;
  runWithdraw: () => void;
}
