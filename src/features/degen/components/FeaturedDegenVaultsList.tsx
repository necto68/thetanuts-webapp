import { LoadingBasicVault } from "../../basic-vault/components";
import { DegenVault } from "../../degen-vault/components";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { degenVaults } from "../../basic/constants";
import {
  useFilteredBasicVaultsIds,
  useFeaturedBasicVaults,
} from "../../basic/hooks";
import { EmptyFeaturedVaultsList } from "../../theta-index/components";

export const FeaturedDegenVaultsList = () => {
  const filteredDegenVaultsIds = useFilteredBasicVaultsIds(degenVaults);
  const featuredDegenVaults = useFeaturedBasicVaults(filteredDegenVaultsIds);

  if (featuredDegenVaults.length === 0) {
    return <EmptyFeaturedVaultsList />;
  }

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
