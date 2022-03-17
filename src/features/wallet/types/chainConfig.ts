import type { ChainId } from "../constants";

export interface ChainConfig {
  chainId: ChainId;
  title: string;
  symbol: string;
  color: string;

  urls: {
    rpc: string;
    explorer: string;
    explorerApi?: string;
  };

  addresses: {
    routerAddress: string;
    lendingPoolAddress: string;
    directDepositorAddress: string;
  };

  keys: {
    explorerApi?: string;
  };
}
