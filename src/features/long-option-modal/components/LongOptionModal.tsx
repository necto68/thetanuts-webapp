import { Switcher } from "./Switcher";
import { PositionInput } from "./PositionInput";
import { StrikePriceInput } from "./StrikePriceInput";
import { ExpirationInput } from "./ExpirationInput";
import { OrderInfo } from "./OrderInfo";
import { OrderCostInfo } from "./OrderCostInfo";
import { Container } from "./LongOptionModal.styles";

export const LongOptionModal = () => (
  <Container>
    <Switcher currentTabType="call" onTabButtonClick={() => null} />
    <PositionInput />
    <StrikePriceInput />
    <ExpirationInput />
    <OrderInfo />
    <OrderCostInfo />
  </Container>
);
