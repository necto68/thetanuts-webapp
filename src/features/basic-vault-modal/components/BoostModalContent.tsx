import { TabType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

import { BoostSwitcher } from "./BoostSwitcher";
import { BoostInputCard } from "./BoostInputCard";
import { BoostPositionInfo } from "./BoostPositionInfo";
import { BoostMainButton } from "./BoostMainButton";
import { UnboostMainButton } from "./UnboostMainButton";
import { PendingDepositMainButton } from "./PendingDepositMainButton";
import { PendingWithdrawMainButton } from "./PendingWithdrawMainButton";
import { Container, MainButtonsContainer } from "./BasicModalContent.styles";
import { BasicCardWarning } from "./BasicCardWarning";
import { BoostBackButton } from "./BoostBackButton";

export const BoostModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return (
    <Container>
      <BoostBackButton />
      <BoostSwitcher />
      <BoostInputCard />
      <BoostPositionInfo />
      <BasicCardWarning />
      <MainButtonsContainer>
        {tabType === TabType.deposit ? (
          <BoostMainButton />
        ) : (
          <UnboostMainButton />
        )}
        {/* {tabType === TabType.deposit ? (
          <PendingDepositMainButton />
        ) : (
          <PendingWithdrawMainButton />
        )} */}
      </MainButtonsContainer>
    </Container>
  );
};
