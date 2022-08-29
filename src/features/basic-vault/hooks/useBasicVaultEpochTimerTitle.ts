import { timerFormatter } from "../../shared/helpers";
import type { BasicVault } from "../types";

import { useCurrentDate } from "./useCurrentDate";

export const useBasicVaultEpochTimerTitle = (
  expiry: BasicVault["expiry"],
  isExpired: BasicVault["isExpired"],
  isSettled: BasicVault["isSettled"]
) => {
  const { currentDate } = useCurrentDate();

  if (isExpired || isSettled) {
    return "Auction In Progress";
  }

  const initialSeconds = Math.floor((expiry - currentDate) / 1000);

  return timerFormatter(initialSeconds);
};
