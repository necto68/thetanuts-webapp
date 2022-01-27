import styled from 'styled-components';
import { Vault } from '../../vault/components';
import { useVaults } from '../../vault/hooks';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 32px;
  color: #e5e5e5;
`;

const VaultsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
`;
