import type { ChainId } from "../constants";

export interface ChainConfig {
  chainId: ChainId;
  title: string;
  symbol: string;
  color: string;
  minGasPrice?: number;

  urls: {
    rpc: string;
    wsRpc: string;
    explorer: string;
    explorerApi?: string;
  };

  addresses: {
    routerAddress: string;
    lendingPoolAddress: string;
    directDepositorAddress: string;
    directWithdrawalAddress: string;
  };

  deployerAddresses?: {
    directWithdrawalDeployerAddress?: string;
  };

  keys: {
    explorerApi?: string;
  };
}
