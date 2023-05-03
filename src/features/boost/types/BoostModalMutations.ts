import type { UseMutationResult } from "react-query";

import type { MutationError } from "../../index-vault-modal/types";

export interface BoostModalMutations {
  approveLpoolAllowanceMutation?: UseMutationResult<
    boolean,
    MutationError,
    void
  >;
  boostMutation?: UseMutationResult<boolean, MutationError, void>;
  unboostMutation?: UseMutationResult<boolean, MutationError, void>;

  boostHash?: string;

  runApproveLpoolAllowance: () => void;
  runBoost: () => void;
  runUnboost: () => void;
}
