import { BasicVault, LoadingBasicVault } from "../../basic-vault/components";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { basicVaults } from "../constants";
import { useFeaturedBasicVaults } from "../hooks";

export const FeaturedBasicVaultsList = () => {
  const basicVaultIds = basicVaults.map(({ id }) => id);

  const featuredBasicVaults = useFeaturedBasicVaults(basicVaultIds);

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
