import { useQueries } from "react-query";

import { indexVaultsMap } from "../../theta-index/constants";
import { chainsMap, chainProvidersMap } from "../../wallet/constants";
import { indexVaultFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useIndexVaults = (indexVaultIds: string[]) => {
  const tokensConfigs = indexVaultIds.map((indexVaultId) => {
    const tokenConfig = indexVaultsMap[indexVaultId];

    const { chainId = 1, indexVaultAddress = "" } = tokenConfig?.source ?? {};

    const { routerAddress, lendingPoolAddress } = chainsMap[chainId].addresses;
    const provider = chainProvidersMap[chainId];

    return {
      id: indexVaultId,
      chainId,
      indexVaultAddress,
      routerAddress,
      lendingPoolAddress,
      provider,
    };
  });

  return useQueries(
    tokensConfigs.map(
      ({
        id,
        chainId,
        indexVaultAddress,
        routerAddress,
        lendingPoolAddress,
        provider,
      }) => ({
        queryKey: [QueryType.indexVault, id, chainId],

        queryFn: async () =>
          await indexVaultFetcher(
            id,
            indexVaultAddress,
            routerAddress,
            lendingPoolAddress,
            provider
          ),

        staleTime: Number.POSITIVE_INFINITY,
      })
    )
  );
};
