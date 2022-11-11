import type { BasicVault } from "../../basic-vault/types";
import { VaultStatus } from "../../basic-vault-modal/types";

export const getVaultStatus = (
  isSettled: BasicVault["isSettled"],
  isExpired: BasicVault["isExpired"],
  isAllowInteractions: BasicVault["isAllowInteractions"]
) => {
  if (!isSettled && isExpired) {
    return VaultStatus.SETTLEMENT;
  }

  if (isSettled && isAllowInteractions) {
    return VaultStatus.SETTLED;
  }

  if (isSettled && !isAllowInteractions) {
    return VaultStatus.AUCTION;
  }

  return VaultStatus.ACTIVE_EPOCH;
};

export const getVaultStatusTitle = (status: VaultStatus) => {
  switch (status) {
    case VaultStatus.AUCTION:
      return "Auction in Progress";
    case VaultStatus.SETTLEMENT:
      return "Auction Settlement";
    case VaultStatus.SETTLED:
      return "Vault Settled";
    case VaultStatus.PAUSE:
      return "Pause";
    default:
      return null;
  }
};
