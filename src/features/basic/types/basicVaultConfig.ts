import type { ChainId } from "../../wallet/constants";

export enum BasicVaultType {
  BASIC = "BASIC",
  DEGEN = "DEGEN",
}

export interface BasicVaultConfig {
  id: string;
  basicVaultType: BasicVaultType;

  source: {
    chainId: ChainId;
    basicVaultAddress: string;
  };
}
