import { VaultType } from "../../basic-vault/types";
import { VaultModalType } from "../../root/types";

export const vaultTypesPrefixes = {
  [VaultModalType.index]: "S",
  [VaultModalType.basic]: "B",
  [VaultModalType.degen]: "D",
  [VaultModalType.wheel]: "W",
  [VaultModalType.long]: "L",
  [VaultModalType.longTrade]: "L",
  [VaultModalType.longPosition]: "L",
};

export const basicVaultTypesPrefixes = {
  [VaultType.CALL]: "C",
  [VaultType.PUT]: "P",
  [VaultType.CONDOR]: "I",
};
