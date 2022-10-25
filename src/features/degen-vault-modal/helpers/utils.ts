import type { BasicVault } from "../../basic-vault/types";
import { VaultStatus } from "../types/VaultStatus";

export const getVaultStatus = (
  isSettled: BasicVault["isSettled"],
  isExpired: BasicVault["isExpired"],
  isAllowInteractions: BasicVault["isAllowInteractions"]
) => {
  if (!isSettled && isExpired) {
    return VaultStatus.Settlement;
  }

  if (isSettled && isAllowInteractions) {
    return VaultStatus.Settled;
  }

  if (isSettled && !isAllowInteractions) {
    return VaultStatus.Auction;
  }

  return VaultStatus.ActiveEpoch;
};

export const getVaultStatusTitle = (status: VaultStatus) => {
  switch (status) {
    case VaultStatus.Auction:
      return "Auction in Progress";
    case VaultStatus.Settlement:
      return "Auction Settlement";
    case VaultStatus.Settled:
      return "Vault Settled";
    case VaultStatus.Pause:
      return "Pause";
    default:
      return null;
  }
};
