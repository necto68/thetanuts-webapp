import { useBasicModalState } from "../hooks";
import { TabType } from "../types";

import { PendingDepositInfo } from "./PendingDepositInfo";
import { PendingWithdrawInfo } from "./PendingWithdrawInfo";

export const PendingPositionInfo = () => {
  const { tabType } = useBasicModalState();

  return tabType === TabType.deposit ? (
    <PendingDepositInfo />
  ) : (
    <PendingWithdrawInfo />
  );
};
