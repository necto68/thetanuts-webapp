import {
  InputCard,
  DepositMainButton,
} from "../../basic-vault-modal/components";
import {
  Container,
  MainButtonsContainer,
} from "../../basic-vault-modal/components/BasicModalContent.styles";
import { useBasicModalState } from "../../basic-vault-modal/hooks";
import { TabType } from "../../basic-vault-modal/types";

import { Switcher } from "./Switcher";

export const LendingMarketModalContent = () => {
  const { tabType } = useBasicModalState();

  return (
    <Container>
      <Switcher />
      {tabType === TabType.deposit ? <InputCard /> : null}
      <MainButtonsContainer>
        {tabType === TabType.deposit ? <DepositMainButton /> : null}
      </MainButtonsContainer>
    </Container>
  );
};
