import {
  BasicCardWarning,
  DepositMainButton,

  // WithdrawMainButton,
  // PendingDepositMainButton,
  // VaultInfo,
} from "../../basic-vault-modal/components";

// import { Switcher } from "./Switcher";

import { CollateralInput } from "./CollateralInput";
import { OrderInfo } from "./OrderInfo";
import { Container, Separator } from "./LongOptionModal.styles";
import { StrikePriceInput } from "./StrikePriceInput";
import { ExpiryInput } from "./ExpiryInput";

export const LongOptionModal = () => (
  <Container>
    {/* <Switcher currentTabType="call" onTabButtonClick={() => null} /> */}
    <CollateralInput />
    <StrikePriceInput />
    <ExpiryInput />
    <Separator />
    <OrderInfo />
    <BasicCardWarning />
    <DepositMainButton />
  </Container>
);
