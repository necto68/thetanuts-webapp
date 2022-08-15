import type { UseMutationResult } from "react-query";

import type { MutationError } from "../../index-vault-modal/types";

export const resetMutations = (
  mutations: (UseMutationResult<boolean, MutationError, void> | undefined)[]
) => {
  mutations.forEach((mutation) => {
    if (mutation) {
      mutation.reset();
    }
  });
};
