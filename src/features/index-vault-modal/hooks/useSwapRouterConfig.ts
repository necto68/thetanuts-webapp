import { useWallet } from "@gimmixorg/use-wallet";

import { useIndexVault } from "../../index-vault/hooks";
import { indexVaultsMap } from "../../theta-index/constants";
import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";

import { useIndexVaultModalState } from "./useIndexVaultModalState";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const useSwapRouterConfig = () => {
  const [{ indexVaultId }] = useIndexVaultModalState();
  const indexVaultQuery = useIndexVault(indexVaultId);
  const { account, network, provider: walletProvider } = useWallet();

  const { data } = indexVaultQuery;
  const {
    assetTokenAddress = "",
    indexTokenAddress = "",
    supportedChainIds = [],
  } = data ?? {};

  const tokenConfig = indexVaultsMap[indexVaultId];
  const {
    source: { chainId: indexVaultChainId = 1, indexVaultAddress = "" },
    replications = [],
  } = tokenConfig ?? {
    source: {},
  };

  const walletChainId: ChainId = network?.chainId ?? 0;
  const isUserOnSupportedChainId = Boolean(
    account && network && supportedChainIds.includes(walletChainId)
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

  const { directDepositorAddress } = chainsMap[indexVaultChainId].addresses;

  const provider = isUserOnSupportedChainId
    ? chainProvidersMap[walletChainId]
    : chainProvidersMap[indexVaultChainId];

  const indexVaultProvider = chainProvidersMap[indexVaultChainId];

  const chainId = isUserOnSupportedChainId ? walletChainId : indexVaultChainId;

  return {
    indexVaultAddress,

    defaultSourceAddress,
    defaultTargetAddress,

    routerAddress,
    directDepositorAddress,

    provider,
    walletProvider,
    indexVaultProvider,

    chainId,
    supportedChainIds,
    isUserOnSupportedChainId,

    indexVaultQuery,
  };
};
