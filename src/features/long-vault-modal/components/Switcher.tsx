import { TabType } from "../../basic-vault-modal/types";
import { TabButton } from "../../basic-vault-modal/components";
import { Container } from "../../basic-vault-modal/components/Switcher.styles";

export const Switcher = () => (
  <Container>
    <TabButton tabType={TabType.deposit}>Open</TabButton>
    <TabButton tabType={TabType.withdraw}>Close</TabButton>
  </Container>
);
