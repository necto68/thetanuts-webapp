import { TabType } from "../types";

import { TabButton } from "./TabButton";
import { Container } from "./Switcher.styles";

export const Switcher = () => (
  <Container>
    <TabButton tabType={TabType.deposit}>Deposit</TabButton>
    <TabButton tabType={TabType.withdraw}>Withdraw</TabButton>
  </Container>
);
