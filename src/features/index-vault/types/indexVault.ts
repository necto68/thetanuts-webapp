import type Big from "big.js";

import type { VaultType } from "../../vault/constants";

export interface VaultInfo {
  lpAmount: Big;
  weight: Big;
  allocation: number;
}

export interface IndexVault {
  type: VaultType;
  assetSymbol: string;
  vaultsAddresses: string[];
  vaultsInfos: VaultInfo[];
  totalWeight: Big;
}
