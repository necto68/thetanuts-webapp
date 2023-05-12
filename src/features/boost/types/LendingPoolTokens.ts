import type { ChainId } from "../../wallet/constants";
import type { VaultType } from "../../basic-vault/types";

export interface LendingPoolTokenConfig {
  id: string;
  sid: string;

  source: {
    chainId: ChainId;
    suppliedTokenAddress: string;
    assetSymbol: string;
    type: VaultType.CALL;
  };
}
