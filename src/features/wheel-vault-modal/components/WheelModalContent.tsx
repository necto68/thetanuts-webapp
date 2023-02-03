import { TabType } from "../../basic-vault-modal/types";
import {
  Switcher,
  InputCard,
  BasicCardWarning,
  DepositMainButton,
  WithdrawMainButton,
  PendingDepositMainButton,
  PendingWithdrawMainButton,
  VaultInfo,
} from "../../basic-vault-modal/components";
import {
  Container,
  MainButtonsContainer,
} from "../../basic-vault-modal/components/BasicModalContent.styles";
import { useVaultModalState } from "../../modal/hooks";

import { Header } from "./Header";
import { PositionInfo } from "./PositionInfo";
import { ReturnOverview } from "./ReturnOverview";

export const WheelModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return (
    <Container>
      <Header />
      <Switcher />
      <InputCard />
      <PositionInfo />
      <BasicCardWarning />
      <ReturnOverview />
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
      {/* <AnalyticLink /> */}
    </Container>
  );
};
