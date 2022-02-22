import { useSwapRouterState } from "./useSwapRouterState";
import { useSwapRouterConfig } from "./useSwapRouterConfig";

export const useSwapRouter = () => {
  const {
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    provider,
  } = useSwapRouterConfig();

  return useSwapRouterState(
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    provider
  );
};
