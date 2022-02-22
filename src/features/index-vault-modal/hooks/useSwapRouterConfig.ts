import { useWallet } from "@gimmixorg/use-wallet";

import { useIndexVault } from "../../index-vault/hooks";
import { indexVaults } from "../../theta-index/constants";
import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";

import { useIndexVaultModalState } from "./useIndexVaultModalState";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const useSwapRouterConfig = () => {
  const [{ tokenSymbol }] = useIndexVaultModalState();

  const {
    data: { assetTokenAddress, indexTokenAddress },
    indexVaultQueries,
  } = useIndexVault(tokenSymbol);
  const { account, network, provider: walletProvider } = useWallet();

  const tokenConfig = indexVaults.find(({ symbol }) => symbol === tokenSymbol);
  const {
    source: { chainId: tokenChainId },
    replications,
  } = tokenConfig ?? {
    source: { chainId: 1 },
    replications: [],
  };

  const supportedChainIds = replications
    .map(({ chainId }) => chainId)
    .concat(tokenChainId);

  const userChainId: ChainId = network?.chainId ?? 0;
  const isUserOnSupportedChainId = Boolean(
    account && network && supportedChainIds.includes(userChainId)
  );

  const tokenReplication = replications.find(
    ({ chainId }) => chainId === userChainId
  );

  const defaultSourceAddress =
    isUserOnSupportedChainId && tokenReplication
      ? tokenReplication.assetTokenAddress
      : assetTokenAddress;

  const defaultTargetAddress =
    isUserOnSupportedChainId && tokenReplication
      ? tokenReplication.indexTokenAddress
      : indexTokenAddress;

  const routerAddress =
    isUserOnSupportedChainId && userChainId in chainsMap
      ? chainsMap[userChainId].addresses.routerAddress
      : chainsMap[tokenChainId].addresses.routerAddress;

  const provider =
    isUserOnSupportedChainId && walletProvider
      ? walletProvider
      : chainProvidersMap[tokenChainId];

  return {
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    provider,
    supportedChainIds,
    isUserOnSupportedChainId,
    indexVaultQueries,
  };
};
