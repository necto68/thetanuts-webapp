import type { ChainId } from "../../wallet/constants";

export interface LendingPoolTokenConfig {
  id: string;
  sid: string;

  source: {
    chainId: ChainId;
    suppliedTokenAddress: string;
    tokenAddressLabel: string;
    suppliedTokenAddressLabel: string;
  };
}
