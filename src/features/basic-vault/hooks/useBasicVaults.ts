import { useQueries } from "react-query";

import { basicVaultsMap } from "../../basic/constants";
import { ChainId, chainProvidersMap } from "../../wallet/constants";
import { basicVaultFetcher } from "../helpers";
import { QueryType } from "../../shared/types";
import { BasicVaultType } from "../../basic/types";

export const useBasicVaults = (basicVaultIds: string[]) => {
  const tokensConfigs = basicVaultIds.map((basicVaultId) => {
    const tokenConfig = basicVaultsMap[basicVaultId];

    const { basicVaultType = BasicVaultType.BASIC } = tokenConfig ?? {};
    const { chainId = ChainId.ETHEREUM, basicVaultAddress = "" } =
      tokenConfig?.source ?? {};

    const provider = chainProvidersMap[chainId];

    return {
      id: basicVaultId,
      basicVaultType,
      chainId,
      basicVaultAddress,
      provider,
    };
  });

  return useQueries(
    tokensConfigs.map(
      ({ id, basicVaultType, chainId, basicVaultAddress, provider }) => ({
        queryKey: [QueryType.basicVault, id, basicVaultType, chainId],

        queryFn: async () =>
          await basicVaultFetcher(
            id,
            basicVaultType,
            basicVaultAddress,
            provider
          ),

        staleTime: Number.POSITIVE_INFINITY,
      })
    )
  );
};
