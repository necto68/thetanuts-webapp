import { useSwapRouterState } from "./useSwapRouterState";
import { useSwapRouterConfig } from "./useSwapRouterConfig";

export const useSwapRouter = () => {
  const {
    indexVaultAddress,
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    directDepositorAddress,
    provider,
    indexVaultProvider,
    chainId,
    indexVaultQuery,
  } = useSwapRouterConfig();

  return useSwapRouterState(
    indexVaultAddress,
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    directDepositorAddress,
    provider,
    indexVaultProvider,
    chainId,
    indexVaultQuery
  );
};
