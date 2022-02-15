import {
  Container,
  AssetContainer,
  AssetTitle,
  MaxButton,
  PriceTitle,
  SwapInput,
  SwapInputContainer,
} from "./SwapInputCard.styles";

export const SwapInputCard = () => (
  <Container>
    <SwapInputContainer>
      <SwapInput defaultValue="1" />
      <PriceTitle>~$2,900</PriceTitle>
    </SwapInputContainer>
    <AssetContainer>
      <AssetTitle>ETH</AssetTitle>
      <MaxButton>MAX</MaxButton>
    </AssetContainer>
  </Container>
);
