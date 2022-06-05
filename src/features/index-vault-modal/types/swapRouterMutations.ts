import type { UseMutationResult } from "react-query";

import type { MutationType, MutationError } from "./mutations";

export interface SwapRouterMutations {
  approveAllowanceMutation?: UseMutationResult<boolean, MutationError, void>;

  swapMutation?: UseMutationResult<boolean, MutationError, MutationType>;
  claimMutation?: UseMutationResult<boolean, MutationError, void>;

  swapMutationHash?: string;

  runApproveAllowance: () => void;
  runSwapTokensForTokens: () => void;
  runDirectDeposit: () => void;
  runDirectWithdraw: () => void;
  runClaim: () => void;
}
