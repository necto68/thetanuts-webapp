import type { FC } from "react";
import { createContext } from "react";

import { useSwapRouterProviderMutations } from "../hooks/useSwapRouterProviderMutations";
import type { SwapRouterMutations } from "../types";

const defaultSwapRouterMutations: SwapRouterMutations = {
  approveAllowanceMutation: undefined,
  swapMutation: undefined,

  runApproveAllowance: () => undefined,
  runSwapTokensForTokens: () => undefined,
  runDirectDeposit: () => undefined,
};

export const SwapRouterMutationsContext = createContext<SwapRouterMutations>(
  defaultSwapRouterMutations
);

export const SwapRouterMutationsProvider: FC = ({ children }) => {
  const swapRouterProviderMutations = useSwapRouterProviderMutations();

  return (
    <SwapRouterMutationsContext.Provider value={swapRouterProviderMutations}>
      {children}
    </SwapRouterMutationsContext.Provider>
  );
};
