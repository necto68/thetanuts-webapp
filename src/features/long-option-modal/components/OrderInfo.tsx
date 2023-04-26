import { PoolTypeInfo } from "./PoolTypeInfo";
import { LeverageInfo } from "./LeverageInfo";
import { BorrowFeeInfo } from "./BorrowFeeInfo";
import {
  Container,

  // InfoContainer,
  // InfoTitle,
  // InfoValue,
} from "./OrderInfo.styles";

export const OrderInfo = () => (
  <Container>
    {/* TODO: return later */}
    {/* <InfoContainer>
        <InfoTitle>IV</InfoTitle>
        <InfoValue>XX.XX%</InfoValue>
      </InfoContainer> */}
    <PoolTypeInfo />
    <LeverageInfo />
    {/* <InfoContainer>
      <InfoTitle>Spread Cost</InfoTitle>
      <InfoValue>X.XX%</InfoValue>
    </InfoContainer> */}
    <BorrowFeeInfo />
  </Container>
);
