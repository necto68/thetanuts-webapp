import { VaultType } from "../../basic-vault/types";
import { VaultModalType } from "../../root/types";

export const vaultTypesPrefixes = {
  [VaultModalType.index]: "S",
  [VaultModalType.basic]: "B",
  [VaultModalType.degen]: "D",
};

export const basicVaultTypesPrefixes = {
  [VaultType.CALL]: "C",
  [VaultType.PUT]: "P",
  [VaultType.CONDOR]: "I",
};
