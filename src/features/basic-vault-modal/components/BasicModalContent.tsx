import { InputCard } from "./InputCard";
import { Switcher } from "./Switcher";
import { Container } from "./BasicModalContent.styles";
import { PositionInfo } from "./PositionInfo";
import { VaultInfo } from "./VaultInfo";

export const BasicModalContent = () => (
  <Container>
    <Switcher />
    <InputCard />
    <PositionInfo />
    <VaultInfo />
  </Container>
);
