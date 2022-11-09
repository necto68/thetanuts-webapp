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

import { Switcher } from "./Switcher";
import { PositionInfo } from "./PositionInfo";

export const LongModalContent = () => {
  const { tabType } = useBasicModalState();

  return (
    <Container>
      <Switcher />
      {tabType === TabType.deposit ? <InputCard /> : null}
      <PositionInfo />
      <MainButtonsContainer>
        {tabType === TabType.deposit ? (
          <DepositMainButton />
        ) : (
          <WithdrawMainButton />
        )}
        {tabType === TabType.deposit ? <PendingDepositMainButton /> : null}
      </MainButtonsContainer>
      <VaultInfo />
    </Container>
  );
};
