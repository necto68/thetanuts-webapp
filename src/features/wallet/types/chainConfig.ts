import type { ComponentType } from "react";

import type { ChainId } from "../constants";

export interface ChainConfig {
  chainId: ChainId;
  title: string;
  logo: ComponentType;
  color: string;

  urls: {
    rpc: string;
    explorer: string;
  };

  addresses: {
    routerAddress: string;
    lendingPoolAddress: string;
    directDepositorAddress: string;
  };
}
