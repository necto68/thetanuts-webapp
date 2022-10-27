import {
  InputCard,
  DepositMainButton,
  WithdrawMainButton,
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

export const LendingMarketModalContent = () => {
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
      </MainButtonsContainer>
      <VaultInfo />
    </Container>
  );
};
