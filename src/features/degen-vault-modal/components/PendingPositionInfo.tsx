import { useBasicModalState } from "../../basic-vault-modal/hooks";
import { TabType } from "../../basic-vault-modal/types";
import { PendingDepositInfo } from "../../basic-vault-modal/components";

import { WithdrawStatusInfo } from "./WithdrawStatusInfo";

export const PendingPositionInfo = () => {
  const { tabType } = useBasicModalState();

  return tabType === TabType.deposit ? (
    <PendingDepositInfo />
  ) : (
    <WithdrawStatusInfo />
  );
};
