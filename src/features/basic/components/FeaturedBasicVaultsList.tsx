import { BasicVault, LoadingBasicVault } from "../../basic-vault/components";
import { EmptyFeaturedVaultsList } from "../../theta-index/components";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { basicVaults } from "../constants";
import { useFilteredBasicVaultsIds, useFeaturedBasicVaults } from "../hooks";

export const FeaturedBasicVaultsList = () => {
  const filteredBasicVaultIds = useFilteredBasicVaultsIds(basicVaults);
  const featuredBasicVaults = useFeaturedBasicVaults(filteredBasicVaultIds);

  if (featuredBasicVaults.length === 0) {
    return <EmptyFeaturedVaultsList />;
  }

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
