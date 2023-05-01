import { DepositMainButton } from "../../basic-vault-modal/components";
import { Container } from "../../long-option-modal/components/LongOptionModal.styles";

import { ModalTitle } from "./ModalTitle";
import { PositionInfo } from "./PositionInfo";
import { OrderInfo } from "./OrderInfo";

export const OpenPositionModalContent = () => (
  <Container>
    <ModalTitle />
    <PositionInfo />
    <OrderInfo />
    <DepositMainButton />
  </Container>
);
