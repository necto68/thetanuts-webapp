import { TabType } from "../../basic-vault-modal/types";
import { TabButton } from "../../basic-vault-modal/components/TabButton";
import { Container } from "../../basic-vault-modal/components/Switcher.styles";

export const BoostSwitcher = () => (
  <Container>
    <TabButton tabType={TabType.deposit}>Boost</TabButton>
    <TabButton tabType={TabType.withdraw}>Unboost</TabButton>
  </Container>
);
