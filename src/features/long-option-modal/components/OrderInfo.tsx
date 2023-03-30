import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "./OrderInfo.styles";

export const OrderInfo = () => (
  <Container>
    <InfoContainer>
      <InfoTitle>Type</InfoTitle>
      <InfoValue>Long Call</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Pool</InfoTitle>
      <InfoValue>10 Delta Matic Long Call</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Leverage</InfoTitle>
      <InfoValue>10x</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Profit Zone</InfoTitle>
      <InfoValue>{"<$XX.XX"}</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Max Loss Zone</InfoTitle>
      <InfoValue>{">$XX.XX"}</InfoValue>
    </InfoContainer>
  </Container>
);
