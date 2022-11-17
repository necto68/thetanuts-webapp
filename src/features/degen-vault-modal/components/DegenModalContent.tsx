import { useBasicModalState } from "../../basic-vault-modal/hooks";
import { TabType } from "../../basic-vault-modal/types";
import {
  Switcher,
  InputCard,
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

import { Header } from "./Header";
import { PositionInfo } from "./PositionInfo";

export const DegenModalContent = () => {
  const { tabType } = useBasicModalState();

  return (
    <Container>
      <Header />
      <Switcher />
      {tabType === TabType.deposit ? <InputCard /> : null}
      <PositionInfo />
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
      {/* TODO: return later --> <AnalyticLink /> */}
    </Container>
  );
};