import { useQueries } from "react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { indexTokensFetcher } from "../helpers";
import { useIndexVaults } from "../../index-vault/hooks";
import { QueryType } from "../../shared/types";

export const useIndexTokensQueries = (indexVaultIds: string[]) => {
  const { walletAddress } = useWallet();

  const indexVaultsQueries = useIndexVaults(indexVaultIds);

  return useQueries(
    indexVaultsQueries.map(({ data }) => {
      const { id = "", indexTokenAddress = "" } = data ?? {};

      return {
        queryKey: [QueryType.indexTokens, id, indexTokenAddress, walletAddress],

        queryFn: async () =>
          await indexTokensFetcher(id, indexTokenAddress, walletAddress),

        enabled: Boolean(data),
      };
    })
  );
};
