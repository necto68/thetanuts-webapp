import type { ChainId } from "../../wallet/constants";

export interface LendingPoolTokenConfig {
  id: string;

  source: {
    chainId: ChainId;
    suppliedTokenAddress: string;
    aavePDP: string;
  };
}
