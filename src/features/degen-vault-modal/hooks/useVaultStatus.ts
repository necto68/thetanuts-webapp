import type { BasicVault } from "../../basic-vault/types";
import { useCurrentDate } from "../../basic-vault/hooks/useCurrentDate";
import { timerFormatter } from "../../shared/helpers";
import { getVaultStatus, getVaultStatusTitle } from "../helpers/utils";

export const useVaultStatus = (
  expiry: BasicVault["expiry"],
  isSettled: BasicVault["isSettled"],
  isExpired: BasicVault["isExpired"],
  isAllowInteractions: BasicVault["isAllowInteractions"]
) => {
  const { currentDate } = useCurrentDate();

  const status = getVaultStatus(isSettled, isExpired, isAllowInteractions);

  const basicVaultStatusTitle = getVaultStatusTitle(status);

  const initialSeconds = Math.floor((expiry - currentDate) / 1000);

  return {
    title: basicVaultStatusTitle ?? timerFormatter(initialSeconds),
    status,
  };
};
