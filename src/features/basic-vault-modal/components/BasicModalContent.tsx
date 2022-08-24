import { Switcher } from "./Switcher";
import { InputCard } from "./InputCard";
import { PositionInfo } from "./PositionInfo";
import { MainButton } from "./MainButton";
import { VaultInfo } from "./VaultInfo";
import { AnalyticLink } from "./AnalyticLink";
import { PendingWithdrawMainButton } from "./PendingWithdrawMainButton";
import { Container, MainButtonsContainer } from "./BasicModalContent.styles";

export const BasicModalContent = () => (
  <Container>
    <Switcher />
    <InputCard />
    <PositionInfo />
    <MainButtonsContainer>
      <MainButton />
      <PendingWithdrawMainButton />
    </MainButtonsContainer>
    <VaultInfo />
    <AnalyticLink />
  </Container>
);
