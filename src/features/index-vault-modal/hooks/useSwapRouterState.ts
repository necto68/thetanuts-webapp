import { useContext } from "react";

import { SwapRouterStateContext } from "../providers/SwapRouterStateProvider";

export const useSwapRouterState = () => useContext(SwapRouterStateContext);
