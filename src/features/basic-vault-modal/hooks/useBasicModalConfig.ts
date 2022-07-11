import { useWallet } from "@gimmixorg/use-wallet";

import { useVaultModalState } from "../../modal/hooks";
import { useBasicVault } from "../../basic-vault/hooks";
import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";

export const useBasicModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();
  const basicVaultQuery = useBasicVault(vaultId);
  const { network, provider: walletProvider } = useWallet();

  const { data } = basicVaultQuery;
  const {
    chainId: basicVaultChainId = 1,
    basicVaultAddress = "",
    collateralTokenAddress = "",
  } = data ?? {};
  const walletChainId: ChainId = network?.chainId ?? 0;

  const { routerAddress } = chainsMap[basicVaultChainId].addresses;

  const provider = chainProvidersMap[basicVaultChainId];

  return {
    walletChainId,
    basicVaultAddress,

    collateralTokenAddress,

    routerAddress,

    provider,
    walletProvider,

    basicVaultChainId,

    basicVaultQuery,
  };
};
