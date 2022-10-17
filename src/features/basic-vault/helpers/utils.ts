import type { BasicVault } from "../types";

export const getBasicVaultStatusTitle = (
  isSettled: BasicVault["isSettled"],
  isExpired: BasicVault["isExpired"],
  isAllowInteractions: BasicVault["isAllowInteractions"]
) => {
  if (!isSettled && isExpired) {
    return "Option expired, waiting for settlement";
  }

  if (isSettled && isAllowInteractions) {
    return "Settled, waiting for auction";
  }

  if (isSettled && !isAllowInteractions) {
    return "Auction in Progress";
  }

  return null;
};
