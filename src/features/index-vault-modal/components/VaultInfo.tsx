import {
  Container,
  InfoContainer,
  PriceInfoContainer,
  InfoValue,
  InfoTitle,
} from "./VaultInfo.styles";

export const VaultInfo = () => (
  <Container>
    <PriceInfoContainer>
      <InfoTitle isUnderline>1 ETH = 0.9713 tETH ($2,000)</InfoTitle>
    </PriceInfoContainer>
    <InfoContainer>
      <InfoTitle>Protocols</InfoTitle>
      <InfoValue>Uniswap v2</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Route</InfoTitle>
      <InfoValue>{"ETH -> tETH"}</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Slippage Tolerance</InfoTitle>
      <InfoValue>0.5%</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle isUnderline>Platform fee</InfoTitle>
      <InfoValue>0.3%</InfoValue>
    </InfoContainer>
  </Container>
);
