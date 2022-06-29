import { BasicVault } from "../../basic-vault/components";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { basicVaults } from "../constants";

export const FeaturedBasicVaultsList = () => {
  const featuredBasicVaults = basicVaults.filter(({ isFeatured }) =>
    Boolean(isFeatured)
  );

  return (
    <Container>
      {featuredBasicVaults.map(({ id }) => (
        <BasicVault basicVaultId={id} key={id} />
      ))}
    </Container>
  );
};
