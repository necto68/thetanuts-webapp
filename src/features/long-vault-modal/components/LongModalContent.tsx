import {
  InputCard,
  DepositMainButton,
  WithdrawMainButton,
  PendingDepositMainButton,
  VaultInfo,
} from "../../basic-vault-modal/components";
import {
  Container,
  MainButtonsContainer,
} from "../../basic-vault-modal/components/BasicModalContent.styles";
import { useBasicModalState } from "../../basic-vault-modal/hooks";
import { TabType } from "../../basic-vault-modal/types";
import { BasicCardWarning } from "../../basic-vault-modal/components/BasicCardWarning";

import { Switcher } from "./Switcher";
import { PositionInfo } from "./PositionInfo";
import {
  WithdrawMainButtonContainer,
  WarningTitle,
} from "./LongModalContent.styles";

export const LongModalContent = () => {
  const { tabType } = useBasicModalState();

  return (
    <Container>
      <Switcher />
      {tabType === TabType.deposit ? <InputCard /> : null}
      <BasicCardWarning />
      <PositionInfo />
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
