import type { FC } from "react";

import type { ChainId } from "../constants";

export interface ChainConfig {
  chainId: ChainId;
  title: string;
  logo: FC;
  color: string;

  urls: {
    rpc: string;
    explorer: string;
  };

  addresses: {
    routerAddress: string;
    lendingPoolAddress: string;
  };
}
