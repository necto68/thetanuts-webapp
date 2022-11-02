import type { ChainId } from "../constants";

export interface ChainConfig {
  chainId: ChainId;
  title: string;
  symbol: string;
  minGasPrice?: number;

  urls: {
    rpc: string;
    explorer: string;
    explorerApi?: string;
  };

  addresses: {
    routerAddress: string;
    lendingPoolAddress: string;
    directDepositorAddress: string;
    directWithdrawalAddress: string;
    basicVaultReaderAddress: string;
    basicVaultDepositorAddress: string;
    lendingMarketPositionManagerAddress: string;
    lendingMarketProtocolDataProviderAddress: string;
  };

  deployerAddresses?: {
    directWithdrawalDeployerAddress?: string;
  };

  keys: {
    explorerApi?: string;
  };
}
