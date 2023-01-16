import {
  InputCard,
  BasicCardWarning,
  DepositMainButton,
  WithdrawMainButton,
  PendingDepositMainButton,
  VaultInfo,
} from "../../basic-vault-modal/components";
import {
  Container,
  MainButtonsContainer,
} from "../../basic-vault-modal/components/BasicModalContent.styles";
import { TabType } from "../../basic-vault-modal/types";
import { useVaultModalState } from "../../modal/hooks";

import { Switcher } from "./Switcher";
import { PositionInfo } from "./PositionInfo";
import {
  WithdrawMainButtonContainer,
  WarningTitle,
} from "./LongModalContent.styles";

export const LongModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return (
    <Container>
      <Switcher />
      {tabType === TabType.deposit ? <InputCard /> : null}
      <PositionInfo />
      <BasicCardWarning />
      <MainButtonsContainer>
        {tabType === TabType.deposit ? (
          <DepositMainButton />
        ) : (
          <WithdrawMainButtonContainer>
            <WithdrawMainButton />
            <WarningTitle>
              Warning - You would give up any potential upside if you close your
              position mid epoch
            </WarningTitle>
          </WithdrawMainButtonContainer>
        )}
        {tabType === TabType.deposit ? <PendingDepositMainButton /> : null}
      </MainButtonsContainer>
      <VaultInfo />
    </Container>
  );
};
