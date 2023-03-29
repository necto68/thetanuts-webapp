import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "./OrderInfo.styles";

export const OrderCostInfo = () => (
  <Container>
    <InfoContainer>
      <InfoTitle>Borrowing Fee</InfoTitle>
      <InfoValue>XX.XX%</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Execution Cost</InfoTitle>
      <InfoValue>0</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Total Cost</InfoTitle>
      <InfoValue>XX.XX MATIC</InfoValue>
    </InfoContainer>
    <InfoContainer>
      <InfoTitle>Your Balance</InfoTitle>
      <InfoValue>0 MATIC</InfoValue>
    </InfoContainer>
  </Container>
);
