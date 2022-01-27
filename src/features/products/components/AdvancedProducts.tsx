import styled from 'styled-components';
import { FeaturedVaults } from './FeaturedVaults';
import { AllVaults } from './AllVaults';

export const AdvancedProducts = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Metavaults</Title>
        <TitleDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
          sodales ullamcorper pretium urna sed egestas consectetur tristique.
          Orci quis faucibus aliquet phasellus sit ut in maecenas ultricies.
          Lacinia mauris pellentesque lacinia dictumst morbi facilisis turpis
          donec nisl. Volutpat aliquam in mauris porta.
        </TitleDescription>
      </TitleContainer>
      <FeaturedVaults />
      <AllVaults />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 25px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 32px;
  color: #e5e5e5;
`;

const TitleDescription = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 22px;
  color: #e5e5e5;
`;
