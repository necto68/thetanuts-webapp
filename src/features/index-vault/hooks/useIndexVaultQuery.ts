import { useQuery } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";
import { providers } from "ethers";

import { indexVaults } from "../../theta-index/constants";
import { chainsMap } from "../../wallet/constants";
import { indexVaultFetcher } from "../helpers";

export const useIndexVaultQuery = (tokenSymbol: string) => {
  const { account, network, provider: walletProvider } = useWallet();
  const userChainId = account && network ? network.chainId : null;

  const tokenConfig = indexVaults.find(({ symbol }) => symbol === tokenSymbol);
  const { chainId: tokenChainId = 0, tokenAddress = "" } =
    tokenConfig?.source ?? {};

  // try to use wallet provider, if it is invalid then fallback to rpcUrl
  const provider =
    walletProvider && userChainId && userChainId === tokenChainId
      ? walletProvider
      : new providers.JsonRpcProvider(chainsMap[tokenChainId].rpcUrl);

  return useQuery({
    queryKey: tokenSymbol,

    queryFn: async () => await indexVaultFetcher(tokenAddress, provider),
  });
};
