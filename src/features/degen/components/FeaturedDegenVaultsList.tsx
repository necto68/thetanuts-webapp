import { LoadingBasicVault } from "../../basic-vault/components";
import { DegenVault } from "../../degen-vault/components";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { degenVaults } from "../../basic/constants";
import { useFeaturedBasicVaults } from "../../basic/hooks";

export const FeaturedDegenVaultsList = () => {
  const degenVaultIds = degenVaults.map(({ id }) => id);
  const featuredDegenVaults = useFeaturedBasicVaults(degenVaultIds);

  return (
    <Container>
      {featuredDegenVaults.map((degenVault, index) =>
        degenVault ? (
          <DegenVault degenVaultId={degenVault.id} key={degenVault.id} />
        ) : (
          <LoadingBasicVault key={index.toString()} />
        )
      )}
    </Container>
  );
};
