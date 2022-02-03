import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";
import { providers } from "ethers";

import { indexVaults } from "../constants";
import { indexVaultFetcher } from "../../index-vault/helpers";

export const useIndexVaultQueries = () => {
  const { account, provider: walletProvider } = useWallet();
  const provider =
    account && walletProvider
      ? walletProvider
      : new providers.JsonRpcProvider("https://polygon-rpc.com/");

  const queries = indexVaults.map((vault) => ({
    queryKey: [vault.symbol],

    queryFn: async () =>
      await indexVaultFetcher(vault.source.tokenAddress, provider),
  }));

  return useQueries(queries);
};
