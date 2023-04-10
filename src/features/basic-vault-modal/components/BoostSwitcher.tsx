import { TabType } from "../types";

import { TabButton } from "./TabButton";
import { Container } from "./Switcher.styles";

export const BoostSwitcher = () => (
  <Container>
    <TabButton tabType={TabType.deposit}>Boost</TabButton>
    <TabButton tabType={TabType.withdraw}>Unboost</TabButton>
  </Container>
);
