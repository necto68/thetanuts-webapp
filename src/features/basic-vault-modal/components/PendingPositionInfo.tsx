import { TabType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

import { PendingDepositInfo } from "./PendingDepositInfo";
import { PendingWithdrawInfo } from "./PendingWithdrawInfo";

export const PendingPositionInfo = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  return tabType === TabType.deposit ? (
    <PendingDepositInfo />
  ) : (
    <PendingWithdrawInfo />
  );
};
