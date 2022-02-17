import { useWallet } from "@gimmixorg/use-wallet";

import { indexVaults } from "../../theta-index/constants";
import { useIndexVault } from "../../index-vault/hooks";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";

import { useSwapRouterState } from "./useSwapRouterState";

// eslint-disable-next-line complexity
export const useSwapRouter = (tokenSymbol: string) => {
  const {
    data: { assetTokenAddress, indexTokenAddress },
  } = useIndexVault(tokenSymbol);
  const { account, network, provider: walletProvider } = useWallet();

  const tokenConfig = indexVaults.find(({ symbol }) => symbol === tokenSymbol);
  const {
    source: { chainId: tokenChainId },
    replications,
  } = tokenConfig ?? {
    source: { chainId: 0 },
    replications: [],
  };

  const supportedChainIds = replications
    .map(({ chainId }) => chainId)
    .concat(tokenChainId);

  const userChainId = network?.chainId ?? 0;
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

  const routerAddress = isUserOnSupportedChainId
    ? chainsMap[userChainId].addresses.routerAddress
    : chainsMap[tokenChainId].addresses.routerAddress;

  const provider =
    isUserOnSupportedChainId && walletProvider
      ? walletProvider
      : chainProvidersMap[tokenChainId];

  return useSwapRouterState(
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    provider
  );
};
