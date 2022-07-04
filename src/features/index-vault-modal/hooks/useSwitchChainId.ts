import { useVaultModalState } from "../../modal/hooks";
import { switchToChain } from "../../wallet/helpers";

import { useSwapRouterConfig } from "./useSwapRouterConfig";

export const useSwitchChainId = () => {
  const { walletChainId, walletProvider } = useSwapRouterConfig();
  const [vaultModalState, setVaultModalState] = useVaultModalState();

  return () => {
    if (vaultModalState.chainId && vaultModalState.chainId !== walletChainId) {
      void switchToChain(vaultModalState.chainId, walletProvider);
    }

    setVaultModalState((previousState) => ({
      ...previousState,
      chainId: null,
    }));
  };
};
