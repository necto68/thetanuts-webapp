import { Switcher } from "./Switcher";
import { InputCard } from "./InputCard";
import { PositionInfo } from "./PositionInfo";
import { MainButton } from "./MainButton";
import { VaultInfo } from "./VaultInfo";
import { Container } from "./BasicModalContent.styles";

export const BasicModalContent = () => (
  <Container>
    <Switcher />
    <InputCard />
    <PositionInfo />
    <MainButton />
    <VaultInfo />
  </Container>
);
