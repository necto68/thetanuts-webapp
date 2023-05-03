import { TabType } from "../../basic-vault-modal/types";
import { useVaultModalState } from "../../modal/hooks";
import {
  Container,
  MainButtonsContainer,
} from "../../basic-vault-modal/components/BasicModalContent.styles";
import { BasicCardWarning } from "../../basic-vault-modal/components/BasicCardWarning";
import { InputCard } from "../../basic-vault-modal/components/InputCard";

import { UnboostMainButton } from "./UnboostMainButton";
import { BoostSwitcher } from "./BoostSwitcher";
import { BoostPositionInfo } from "./BoostPositionInfo";
import { BoostMainButton } from "./BoostMainButton";
import { BoostBackButton } from "./BoostBackButton";

export const BoostModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return (
    <Container>
      <BoostBackButton />
      <BoostSwitcher />
      <InputCard />
      <BoostPositionInfo />
      <BasicCardWarning />
      <MainButtonsContainer>
        {tabType === TabType.deposit ? (
          <BoostMainButton />
        ) : (
          <UnboostMainButton />
        )}
      </MainButtonsContainer>
    </Container>
  );
};
