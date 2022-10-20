import type { UseMutationResult } from "react-query";

import type { MutationError } from "../../index-vault-modal/types";

export interface LendingMarketModalMutations {
  openPositionMutation?: UseMutationResult<boolean, MutationError, void>;

  mutationHash?: string;

  runOpenPosition: () => void;
}
