import { timerFormatter } from "../../shared/helpers";
import { getBasicVaultStatusTitle } from "../helpers";
import type { BasicVault } from "../types";

import { useCurrentDate } from "./useCurrentDate";

export const useBasicVaultEpochTimerTitle = (
  expiry: BasicVault["expiry"],
  isSettled: BasicVault["isSettled"],
  isExpired: BasicVault["isExpired"],
  isAllowInteractions: BasicVault["isAllowInteractions"]
) => {
  const { currentDate } = useCurrentDate();

  const basicVaultStatusTitle = getBasicVaultStatusTitle(
    isSettled,
    isExpired,
    isAllowInteractions
  );

  if (basicVaultStatusTitle) {
    return basicVaultStatusTitle;
  }

  const initialSeconds = Math.floor((expiry - currentDate) / 1000);

  return timerFormatter(initialSeconds);
};
