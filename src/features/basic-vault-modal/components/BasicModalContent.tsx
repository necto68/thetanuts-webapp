import { TabType } from "../types";
import { useVaultModalState } from "../../modal/hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { BoostContent } from "../../boost/components/BoostContent";

import { Switcher } from "./Switcher";
import { InputCard } from "./InputCard";
import { PositionInfo } from "./PositionInfo";
import { DepositMainButton } from "./DepositMainButton";
import { WithdrawMainButton } from "./WithdrawMainButton";
import { WithdrawNowMainButton } from "./WithdrawNowMainButton";
import { PendingDepositMainButton } from "./PendingDepositMainButton";
import { PendingWithdrawMainButton } from "./PendingWithdrawMainButton";
import { VaultInfo } from "./VaultInfo";
import { AnalyticLink } from "./AnalyticLink";
import { Container, MainButtonsContainer } from "./BasicModalContent.styles";
import { BasicCardWarning } from "./BasicCardWarning";

export const BasicModalContent = () => {
  const [vaultModalState] = useVaultModalState();
  const { lendingPoolReaderQuery } = useBasicModalConfig();
  const { tabType, vaultId } = vaultModalState;

  // TODO: remove later
  const shouldHideAnalyticLink = [
    "TN-CSCCv1-ARBUSD",
    "TN-CSCCv1-FILUSD",
  ].includes(vaultId);

  const { data: lendingPoolReaderData } = lendingPoolReaderQuery;
  const { shouldShowBoost = false } = lendingPoolReaderData ?? {};

  return (
    <Container>
      <Switcher />
      <InputCard />
      <PositionInfo />
      <BasicCardWarning />
      <MainButtonsContainer>
        {tabType === TabType.deposit ? (
          <DepositMainButton />
        ) : (
          <>
            <WithdrawMainButton />
            <PendingWithdrawMainButton />
            {shouldShowBoost ? <WithdrawNowMainButton /> : null}
          </>
        )}
        {tabType === TabType.deposit ? <PendingDepositMainButton /> : null}
      </MainButtonsContainer>
      <VaultInfo />
      {shouldHideAnalyticLink ? null : <AnalyticLink />}
      {shouldShowBoost && <BoostContent />}
    </Container>
  );
};
