import { LoadingBasicVault } from "../../basic-vault/components";
import { Container } from "../../theta-index/components/FeaturedIndexVaultsList.styles";
import { wheelVaults } from "../../basic/constants";
import { useFeaturedBasicVaults } from "../../basic/hooks";
import { WheelVault } from "../../wheel-vault/components";

// import { EmptyFeaturedVaultsList } from "../../theta-index/components";

export const FeaturedWheelVaultsList = () => {
  const wheelVaultIds = wheelVaults.map(({ id }) => id);
  const featuredWheelVaults = useFeaturedBasicVaults(wheelVaultIds);

  // if (featuredBasicVaults.length === 0) {
  //   return <EmptyFeaturedVaultsList />;
  // }

  return (
    <Container>
      {featuredWheelVaults.map((wheelVault, index) =>
        wheelVault ? (
          <WheelVault key={wheelVault.id} wheelVaultId={wheelVault.id} />
        ) : (
          <LoadingBasicVault key={index.toString()} />
        )
      )}
    </Container>
  );
};
