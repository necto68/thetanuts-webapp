import {
  BasicCardWarning,
  DepositMainButton,

  // WithdrawMainButton,
  // PendingDepositMainButton,
  // VaultInfo,
} from "../../basic-vault-modal/components";

import { VaultTypeSwitcher } from "./VaultTypeSwitcher";
import { CollateralInput } from "./CollateralInput";
import { OrderInfo } from "./OrderInfo";
import { Container, Separator } from "./LongOptionModal.styles";
import { StrikePriceInput } from "./StrikePriceInput";
import { ExpiryInput } from "./ExpiryInput";

export const LongOptionModal = () => (
  <Container>
    <VaultTypeSwitcher />
    <CollateralInput />
    <StrikePriceInput />
    <ExpiryInput />
    <Separator />
    <OrderInfo />
    <BasicCardWarning />
    <DepositMainButton />
  </Container>
);
