import { TabType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

import { Switcher } from "./Switcher";
import { InputCard } from "./InputCard";
import { PositionInfo } from "./PositionInfo";
import { DepositMainButton } from "./DepositMainButton";
import { WithdrawMainButton } from "./WithdrawMainButton";
import { PendingDepositMainButton } from "./PendingDepositMainButton";
import { PendingWithdrawMainButton } from "./PendingWithdrawMainButton";
import { VaultInfo } from "./VaultInfo";
import { AnalyticLink } from "./AnalyticLink";
import { Container, MainButtonsContainer } from "./BasicModalContent.styles";
import { BasicCardWarning } from "./BasicCardWarning";

export const BasicModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType, vaultId } = vaultModalState;

  // TODO: remove later
  const shouldHideAnalyticLink = [
    "TN-CSCCv1-FILUSD",
    "TN-CSCCv1-STMATICUSD",
  ].includes(vaultId);

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
        {tabType === TabType.deposit ? (
          <PendingDepositMainButton />
        ) : (
          <PendingWithdrawMainButton />
        )}
      </MainButtonsContainer>
      <VaultInfo />
      {shouldHideAnalyticLink ? null : <AnalyticLink />}
    </Container>
  );
};
