import { IndexVault } from "../../index-vault/components";
import { indexVaults } from "../constants";

import { Container } from "./FeaturedIndexVaultsList.styles";

export const FeaturedIndexVaultsList = () => {
  const featuredIndexVaults = indexVaults.filter(({ isFeatured }) =>
    Boolean(isFeatured)
  );

  return (
    <Container>
      {featuredIndexVaults.map(({ id }) => (
        <IndexVault indexVaultId={id} key={id} />
      ))}
    </Container>
  );
};
