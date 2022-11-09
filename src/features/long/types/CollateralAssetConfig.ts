import type { ChainId } from "../../wallet/constants";

export interface CollateralAssetConfig {
  id: string;

  source: {
    chainId: ChainId;
    collateralAssetAddress: string;
    lendingPoolAddressesProviderAddress: string;
  };
}
