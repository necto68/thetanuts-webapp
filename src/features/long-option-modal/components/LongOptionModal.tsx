import {
  BasicCardWarning,
  DepositMainButton,

  // WithdrawMainButton,
  // PendingDepositMainButton,
  // VaultInfo,
} from "../../basic-vault-modal/components";

// import { Switcher } from "./Switcher";

// import { StrikePriceInput } from "./StrikePriceInput";
// import { ExpirationInput } from "./ExpirationInput";
import { CollateralInput } from "./CollateralInput";
import { OrderInfo } from "./OrderInfo";
import { OrderCostInfo } from "./OrderCostInfo";
import { Container } from "./LongOptionModal.styles";

export const LongOptionModal = () => (
  <Container>
    {/* <Switcher currentTabType="call" onTabButtonClick={() => null} /> */}
    <CollateralInput />
    <OrderInfo />
    <OrderCostInfo />
    <BasicCardWarning />
    <DepositMainButton />
  </Container>
);
