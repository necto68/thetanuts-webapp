import { useBasicVaults } from "../../basic-vault/hooks";

export const useFeaturedBasicVaults = (basicVaultIds: string[]) => {
  const basicVaultQueries = useBasicVaults(basicVaultIds);
  const isBasicVaultsLoading = basicVaultQueries.some(
    ({ isLoading }) => isLoading
  );

  const basicVaultsData = basicVaultQueries.map(({ data }) =>
    !isBasicVaultsLoading ? data : null
  );

  const sortedBasicVaultsByAPY = Array.from(basicVaultsData).sort((a, b) =>
    a && b ? b.annualPercentageYield - a.annualPercentageYield : 0
  );

  // get first 4 vaults by APY
  return sortedBasicVaultsByAPY.slice(0, 4);
};
