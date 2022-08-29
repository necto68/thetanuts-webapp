import type { ChainId } from "../../wallet/constants";

export interface BasicVaultConfig {
  id: string;
  isFeatured?: boolean;

  source: {
    chainId: ChainId;
    basicVaultAddress: string;
  };
}
