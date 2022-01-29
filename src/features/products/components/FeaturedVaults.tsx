import { Vault } from "../../vault/components";
import { useVaults } from "../../vault/hooks";

import { Container, Title, VaultsList } from "./FeaturedVaults.styles";

export const FeaturedVaults = () => {
  const vaults = useVaults();

  return (
    <Container>
      <Title>Featured Metavaults</Title>
      <VaultsList>
        {vaults.map(({ address }) => (
          <Vault key={address} vaultAddress={address} />
        ))}
      </VaultsList>
    </Container>
  );
};
