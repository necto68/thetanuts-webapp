import { useQuery, useQueries } from "react-query";
import Big from "big.js";

import { indexVaults } from "../../theta-index/constants";
import { chainProvidersMap } from "../../wallet/constants";
import {
  indexVaultFetcher,
  vaultFetcher,
  getTotalValueLocked,
  getTotalAnnualPercentageYield,
} from "../helpers";
import { VaultType } from "../../vault/constants";

export const useIndexVault = (tokenSymbol: string) => {
  const tokenConfig = indexVaults.find(({ symbol }) => symbol === tokenSymbol);
  const { chainId: tokenChainId = 0, tokenAddress = "" } =
    tokenConfig?.source ?? {};

  const provider = chainProvidersMap[tokenChainId];

  const { isLoading: isIndexVaultLoading, data: indexVaultData } = useQuery({
    queryKey: [tokenSymbol, tokenChainId],

    queryFn: async () => await indexVaultFetcher(tokenAddress, provider),
  });

  // use fetched vaultsAddresses for fetching sub vaults
  const {
    type = VaultType.CALL,
    assetSymbol = "",
    vaultsAddresses = [],
    vaultsInfos = [],
    totalWeight = new Big(0),
  } = indexVaultData ?? {};

  const vaultsQueries = useQueries(
    vaultsAddresses.map((vaultAddress) => ({
      queryKey: [vaultAddress, tokenChainId],
      queryFn: async () => await vaultFetcher(vaultAddress, provider),
    }))
  );

  const areVaultsLoading =
    isIndexVaultLoading || vaultsQueries.some(({ isLoading }) => isLoading);

  const vaults = vaultsQueries.map(({ data }) => data);
  const totalValueLocked = getTotalValueLocked(vaults, vaultsInfos);
  const totalAnnualPercentageYield = getTotalAnnualPercentageYield(
    vaults,
    vaultsInfos,
    totalWeight
  );

  return {
    isIndexVaultLoading,
    areVaultsLoading,

    data: {
      type,
      assetSymbol,
      vaultsInfos,
      totalValueLocked,
      totalAnnualPercentageYield,
    },
  };
};
