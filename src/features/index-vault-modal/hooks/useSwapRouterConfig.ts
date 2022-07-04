import { useWallet } from "@gimmixorg/use-wallet";

import { useIndexVault } from "../../index-vault/hooks";
import { indexVaultsMap } from "../../theta-index/constants";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { useVaultModalState } from "../../modal/hooks";

// eslint-disable-next-line complexity
export const useSwapRouterConfig = () => {
  const [{ vaultId, contentType }] = useVaultModalState();
  const indexVaultQuery = useIndexVault(vaultId);
  const { account, network, provider: walletProvider } = useWallet();

  const { data } = indexVaultQuery;
  const {
    assetTokenAddress = "",
    indexTokenAddress = "",
    supportedChainIds = [],
    chainId: mainChainId,
  } = data ?? {};

  const tokenConfig = indexVaultsMap[vaultId];
  const {
    source: {
      chainId: indexVaultChainId = ChainId.ETHEREUM,
      indexVaultAddress = "",
    },
    replications = [],
  } = tokenConfig ?? {
    source: {},
  };

  const walletChainId: ChainId = network?.chainId ?? 0;
  const isUserOnSupportedChainId = Boolean(
    account && network && supportedChainIds.includes(walletChainId)
  );

  const isUserOnMainChainId = Boolean(
    account && network && mainChainId === walletChainId
  );

  const tokenReplication = replications.find(
    ({ chainId }) => chainId === walletChainId
  );

  const defaultSourceAddress =
    isUserOnSupportedChainId && tokenReplication
      ? tokenReplication.assetTokenAddress
      : assetTokenAddress;

  const defaultTargetAddress =
    isUserOnSupportedChainId && tokenReplication
      ? tokenReplication.indexTokenAddress
      : indexTokenAddress;

  const { routerAddress } =
    isUserOnSupportedChainId && walletChainId in chainsMap
      ? chainsMap[walletChainId].addresses
      : chainsMap[indexVaultChainId].addresses;

  const { directDepositorAddress, directWithdrawalAddress } =
    chainsMap[indexVaultChainId].addresses;

  const { directWithdrawalDeployerAddress } =
    chainsMap[indexVaultChainId].deployerAddresses ?? {};

  const provider = isUserOnSupportedChainId
    ? chainProvidersMap[walletChainId]
    : chainProvidersMap[indexVaultChainId];

  const indexVaultProvider = chainProvidersMap[indexVaultChainId];

  const chainId = isUserOnSupportedChainId ? walletChainId : indexVaultChainId;

  return {
    contentType,
    walletChainId,
    indexVaultAddress,

    defaultSourceAddress,
    defaultTargetAddress,

    routerAddress,
    directDepositorAddress,
    directWithdrawalAddress,
    directWithdrawalDeployerAddress,

    provider,
    walletProvider,
    indexVaultProvider,

    chainId,
    supportedChainIds,
    isUserOnSupportedChainId,
    isUserOnMainChainId,

    indexVaultQuery,
  };
};
