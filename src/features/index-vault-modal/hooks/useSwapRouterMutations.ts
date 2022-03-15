import { useContext } from "react";

import { SwapRouterMutationsContext } from "../providers/SwapRouterMutationsProvider";

export const useSwapRouterMutations = () =>
  useContext(SwapRouterMutationsContext);
