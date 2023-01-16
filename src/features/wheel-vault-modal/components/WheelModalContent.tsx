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
import { PositionInfo } from "../../basic-vault-modal/components/PositionInfo";
import {
  Container,
  MainButtonsContainer,
} from "../../basic-vault-modal/components/BasicModalContent.styles";
import { useVaultModalState } from "../../modal/hooks";

import { Header } from "./Header";

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
