import { useQueries } from "react-query";

import { indexVaults } from "../../theta-index/constants";
import { chainsMap, chainProvidersMap } from "../../wallet/constants";
import { indexVaultFetcher } from "../helpers";

export const useIndexVaults = (indexVaultIds: string[]) => {
  const tokensConfigs = indexVaultIds.map((indexVaultId) => {
    const tokenConfig = indexVaults.find(({ id }) => id === indexVaultId);

    const { chainId = 1, indexVaultAddress = "" } = tokenConfig?.source ?? {};

    const { lendingPoolAddress } = chainsMap[chainId].addresses;
    const provider = chainProvidersMap[chainId];

    return {
      id: indexVaultId,
      chainId,
      indexVaultAddress,
      lendingPoolAddress,
      provider,
    };
  });

  return useQueries(
    tokensConfigs.map(
      ({ id, chainId, indexVaultAddress, lendingPoolAddress, provider }) => ({
        queryKey: [id, chainId],

        queryFn: async () =>
          await indexVaultFetcher(
            id,
            indexVaultAddress,
            lendingPoolAddress,
            provider
          ),

        staleTime: Number.POSITIVE_INFINITY,
      })
    )
  );
};
