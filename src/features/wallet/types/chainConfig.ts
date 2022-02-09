import type { FC } from "react";

import type { ChainId } from "../constants";

export interface ChainConfig {
  chainId: ChainId;
  title: string;
  logo: FC;
  color: string;
  rpcUrl: string;
  addresses: {
    routerAddress: string;
    lendingPoolAddress: string;
  };
}
