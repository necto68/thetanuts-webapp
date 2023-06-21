import type { VaultType } from "../../basic-vault/types";

export interface TypeGroup {
  [VaultType.CALL]: string;
  [VaultType.PUT]: string;
}

export type StrikePricesGroup = string[];
