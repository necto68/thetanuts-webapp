import { FeaturedVaults } from "./FeaturedVaults";
import { AllVaults } from "./AllVaults";
import {
  Container,
  TitleContainer,
  Title,
  TitleDescription,
} from "./AdvancedProducts.styles";

export const AdvancedProducts = () => (
  <Container>
    <TitleContainer>
      <Title>Metavaults</Title>
      <TitleDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales
        ullamcorper pretium urna sed egestas consectetur tristique. Orci quis
        faucibus aliquet phasellus sit ut in maecenas ultricies. Lacinia mauris
        pellentesque lacinia dictumst morbi facilisis turpis donec nisl.
        Volutpat aliquam in mauris porta.
      </TitleDescription>
    </TitleContainer>
    <FeaturedVaults />
    <AllVaults />
  </Container>
);
