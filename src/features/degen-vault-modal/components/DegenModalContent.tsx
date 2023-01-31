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
  AnalyticLink,
} from "../../basic-vault-modal/components";
import {
  Container,
  MainButtonsContainer,
} from "../../basic-vault-modal/components/BasicModalContent.styles";
import { useVaultModalState } from "../../modal/hooks";

import { Header } from "./Header";
import { PositionInfo } from "./PositionInfo";

export const DegenModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return (
    <Container>
      <Header />
      <Switcher />
      {tabType === TabType.deposit ? <InputCard /> : null}
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
      <AnalyticLink />
    </Container>
  );
};
