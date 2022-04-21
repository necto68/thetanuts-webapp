import { IndexVault, DemoIndexVault } from "../../index-vault/components";
import { indexVaults, demoIndexVaults } from "../constants";

import { Container } from "./FeaturedIndexVaultsList.styles";

export const FeaturedIndexVaultsList = () => {
  const featuredIndexVaults = indexVaults.filter(({ isFeatured }) =>
    Boolean(isFeatured)
  );

  const featuredDemoIndexVaults = demoIndexVaults.filter(({ isFeatured }) =>
    Boolean(isFeatured)
  );

  return (
    <Container>
      {featuredIndexVaults.map(({ id }) => (
        <IndexVault indexVaultId={id} key={id} />
      ))}
      {featuredDemoIndexVaults.map(({ id }) => (
        <DemoIndexVault demoIndexVaultId={id} key={id} />
      ))}
    </Container>
  );
};
