import { BasicVault, LoadingBasicVault } from "../../basic-vault/components";
import { useBasicVaults } from "../../basic-vault/hooks";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { basicVaults } from "../constants";

export const FeaturedBasicVaultsList = () => {
  const basicVaultIds = basicVaults.map(({ id }) => id);
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
  const featuredBasicVaults = sortedBasicVaultsByAPY.slice(0, 4);

  return (
    <Container>
      {featuredBasicVaults.map((basicVault, index) =>
        basicVault ? (
          <BasicVault basicVaultId={basicVault.id} key={basicVault.id} />
        ) : (
          <LoadingBasicVault key={index.toString()} />
        )
      )}
    </Container>
  );
};
