import { BasicVault, LoadingBasicVault } from "../../basic-vault/components";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { basicVaults } from "../constants";
import { useFeaturedBasicVaults } from "../hooks";

// import { EmptyFeaturedVaultsList } from "../../theta-index/components";

export const FeaturedBasicVaultsList = () => {
  const basicVaultIds = basicVaults.map(({ id }) => id);
  const featuredBasicVaults = useFeaturedBasicVaults(basicVaultIds);

  // if (featuredBasicVaults.length === 0) {
  //   return <EmptyFeaturedVaultsList />;
  // }

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
