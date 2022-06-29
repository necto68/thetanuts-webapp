import { timerFormatter } from "../../shared/helpers";
import type { Vault } from "../../index-vault/types";

import { useCurrentDate } from "./useCurrentDate";

export const useBasicVaultEpochTimerTitle = (
  expiry: Vault["expiry"],
  isExpired: Vault["isExpired"],
  isSettled: Vault["isSettled"]
) => {
  const { currentDate } = useCurrentDate();

  if (isExpired || isSettled) {
    return "Auction In Progress";
  }

  const initialSeconds = Math.floor((expiry - currentDate) / 1000);

  return timerFormatter(initialSeconds);
};
