import { useBasicModalState } from "../hooks";
import { TabType } from "../types";

import { Switcher } from "./Switcher";
import { InputCard } from "./InputCard";
import { PositionInfo } from "./PositionInfo";
import { DepositMainButton } from "./DepositMainButton";
import { WithdrawMainButton } from "./WithdrawMainButton";
import { PendingWithdrawMainButton } from "./PendingWithdrawMainButton";
import { VaultInfo } from "./VaultInfo";
import { AnalyticLink } from "./AnalyticLink";
import { Container, MainButtonsContainer } from "./BasicModalContent.styles";
import { BasicCardWarning } from "./BasicCardWarning";

export const BasicModalContent = () => {
  const { tabType } = useBasicModalState();

  return (
    <Container>
      <Switcher />
      <InputCard />
      <PositionInfo />
      <BasicCardWarning />
      <MainButtonsContainer>
        {tabType === TabType.deposit ? (
          <DepositMainButton />
        ) : (
          <WithdrawMainButton />
        )}
        {tabType === TabType.withdraw ? <PendingWithdrawMainButton /> : null}
      </MainButtonsContainer>
      <VaultInfo />
      <AnalyticLink />
    </Container>
  );
};
