import { useVaultModalState } from "../../modal/hooks";
import { Container } from "../../index-vault-modal/components/VaultInfo.styles";
import { TabType } from "../../basic-vault-modal/types";
import { PendingWithdrawInfo } from "../../basic-vault-modal/components/PendingWithdrawInfo";
import { VaultStatusInfo } from "../../basic-vault-modal/components/VaultStatusInfo";

export const PositionInfo = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return (
    <Container>
      <VaultStatusInfo />
      {tabType === TabType.withdraw ? <PendingWithdrawInfo /> : null}
    </Container>
  );
};
