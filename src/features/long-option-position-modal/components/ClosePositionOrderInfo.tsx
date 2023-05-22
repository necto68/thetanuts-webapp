import { Container } from "../../long-option-modal/components/OrderInfo.styles";

import { InstrumentInfo } from "./InstrumentInfo";
import { SideInfo } from "./SideInfo";
import { SizeInfo } from "./SizeInfo";
import { ReceiveInfo } from "./ReceiveInfo";
import { ExpirationInfo } from "./ExpirationInfo";

export const ClosePositionOrderInfo = () => (
  <Container>
    <InstrumentInfo />
    <SideInfo />
    <SizeInfo />
    <ReceiveInfo />
    <ExpirationInfo />
  </Container>
);
