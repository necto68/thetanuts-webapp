import { useWallet } from "@gimmixorg/use-wallet";

import { useVaultModalState } from "../../modal/hooks";
import { useBasicVault, useBasicVaultReader } from "../../basic-vault/hooks";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";

export const useBasicModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const basicVaultQuery = useBasicVault(vaultId);
  const basicVaultReaderQuery = useBasicVaultReader(vaultId);

  const { network, provider: walletProvider } = useWallet();

  const { data } = basicVaultQuery;
  const {
    chainId: basicVaultChainId = ChainId.ETHEREUM,
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
    basicVaultReaderQuery,
  };
};
