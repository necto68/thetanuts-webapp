import { Container } from "../../long-option-modal/components/OrderInfo.styles";

import { SizeInfo } from "./SizeInfo";
import { ReceiveInfo } from "./ReceiveInfo";
import { ExpiryInfo } from "./ExpiryInfo";

export const ClosePositionOrderInfo = () => (
  <Container>
    <SizeInfo />
    <ReceiveInfo />
    <ExpiryInfo />
  </Container>
);
