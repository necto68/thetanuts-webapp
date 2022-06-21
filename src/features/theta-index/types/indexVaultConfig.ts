import type { ChainId } from "../../wallet/constants";

export interface IndexVaultConfig {
  id: string;
  isFeatured?: boolean;

  source: {
    chainId: ChainId;
    indexVaultAddress: string;
  };

  replications: {
    chainId: ChainId;
    assetTokenAddress: string;
    indexTokenAddress: string;
  }[];

  priceFeeds: {
    assetPriceFeedAddress: string;
    indexPriceFeedAddress: string;
  };
}
