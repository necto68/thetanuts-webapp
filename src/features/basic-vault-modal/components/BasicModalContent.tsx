import { DepositInputCard } from "./DepositInputCard";
import { Switcher } from "./Switcher";
import { Container } from "./BasicModalContent.styles";

export const BasicModalContent = () => (
  <Container>
    <Switcher />
    <DepositInputCard />
  </Container>
);
