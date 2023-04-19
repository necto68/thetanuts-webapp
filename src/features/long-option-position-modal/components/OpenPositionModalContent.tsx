import { DepositMainButton } from "../../basic-vault-modal/components";
import { Container } from "../../basic-vault-modal/components/BasicModalContent.styles";

// import { Container } from "../../long-option-modal/components/LongOptionModal.styles";
import { PositionInfo } from "./PositionInfo";
import { OrderInfo } from "./OrderInfo";

export const OpenPositionModalContent = () => (
  <Container>
    <PositionInfo />
    <OrderInfo />
    <DepositMainButton />
  </Container>
);
