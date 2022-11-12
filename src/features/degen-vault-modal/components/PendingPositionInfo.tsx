import { TabType } from "../../basic-vault-modal/types";
import { PendingDepositInfo } from "../../basic-vault-modal/components";
import { useVaultModalState } from "../../modal/hooks";

import { WithdrawStatusInfo } from "./WithdrawStatusInfo";

export const PendingPositionInfo = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return tabType === TabType.deposit ? (
    <PendingDepositInfo />
  ) : (
    <WithdrawStatusInfo />
  );
};
