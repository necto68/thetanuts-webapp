import {
  Container,
  Title,
  SubTitle,
  PriceTitle,
  CurrentPriceContainer,
} from "./AssetHeader.styles";

export const AssetHeader = () => (
  <Container>
    <Title>Matic Long</Title>
    <CurrentPriceContainer>
      <SubTitle>Current Price</SubTitle>
      <PriceTitle>$XX.XX</PriceTitle>
    </CurrentPriceContainer>
  </Container>
);
