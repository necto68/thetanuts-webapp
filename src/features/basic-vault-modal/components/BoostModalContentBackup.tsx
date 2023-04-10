import { TabType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

import { BoostSwitcher } from "./BoostSwitcher";
import { InputCard } from "./InputCard";
import { BoostPositionInfo } from "./BoostPositionInfo";
import { BoostMainButton } from "./BoostMainButton";
import { UnboostMainButton } from "./UnboostMainButton";
import { PendingDepositMainButton } from "./PendingDepositMainButton";
import { PendingWithdrawMainButton } from "./PendingWithdrawMainButton";
import { VaultInfo } from "./VaultInfo";
import { AnalyticLink } from "./AnalyticLink";
import { Container, MainButtonsContainer } from "./BasicModalContent.styles";
import { BasicCardWarning } from "./BasicCardWarning";
import { BoostContent } from "./BoostContent";

export const BasicModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return (
    <Container>
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
        {tabType === TabType.deposit ? (
          <PendingDepositMainButton />
        ) : (
          <PendingWithdrawMainButton />
        )}
      </MainButtonsContainer>
      {/* <VaultInfo /> */}
      {/* <AnalyticLink />
      <BoostContent /> */}
    </Container>
  );
};
