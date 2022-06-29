import { useQueries } from "react-query";

import { basicVaultsMap } from "../../basic/constants";
import { chainProvidersMap } from "../../wallet/constants";
import { basicVaultFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useBasicVaults = (basicVaultIds: string[]) => {
  const tokensConfigs = basicVaultIds.map((basicVaultId) => {
    const tokenConfig = basicVaultsMap[basicVaultId];

    const { chainId = 1, basicVaultAddress = "" } = tokenConfig?.source ?? {};

    const provider = chainProvidersMap[chainId];

    return {
      id: basicVaultId,
      chainId,
      basicVaultAddress,
      provider,
    };
  });

  return useQueries(
    tokensConfigs.map(({ chainId, basicVaultAddress, provider }) => ({
      queryKey: [QueryType.basicVault, basicVaultAddress, chainId],

      queryFn: async () => await basicVaultFetcher(basicVaultAddress, provider),

      staleTime: Number.POSITIVE_INFINITY,
    }))
  );
};
