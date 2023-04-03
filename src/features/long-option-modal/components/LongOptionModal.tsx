import {
  InputCard,
  BasicCardWarning,
  DepositMainButton,

  // WithdrawMainButton,
  // PendingDepositMainButton,
  // VaultInfo,
} from "../../basic-vault-modal/components";

// import { Switcher } from "./Switcher";
// import { PositionInput } from "./PositionInput";
// import { StrikePriceInput } from "./StrikePriceInput";
// import { ExpirationInput } from "./ExpirationInput";
import { OrderInfo } from "./OrderInfo";
import { OrderCostInfo } from "./OrderCostInfo";
import { Container } from "./LongOptionModal.styles";

export const LongOptionModal = () => (
  <Container>
    {/* <Switcher currentTabType="call" onTabButtonClick={() => null} /> */}
    <InputCard />
    <OrderInfo />
    <OrderCostInfo />
    <BasicCardWarning />
    <DepositMainButton />
  </Container>
);
