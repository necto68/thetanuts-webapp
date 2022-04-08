import { useEffect } from "react";
import type { UseMutationResult } from "react-query";

export const useResetMutationError = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  mutation: UseMutationResult<TData, TError, TVariables, TContext>
) => {
  useEffect(() => {
    if (mutation.isError) {
      const timeoutId = setTimeout(() => {
        mutation.reset();
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return () => undefined;
  }, [mutation]);
};
