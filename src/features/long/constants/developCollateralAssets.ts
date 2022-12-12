import { ChainId } from "../../wallet/constants";
import type { CollateralAssetConfig } from "../types";

export const developCollateralAssets: CollateralAssetConfig[] = [
  {
    id: "tWETH",

    source: {
      chainId: ChainId.POLYGON,
      collateralAssetAddress: "0xd9F0446AedadCf16A12692E02FA26C617FA4D217",

      lendingPoolAddressesProviderAddress:
        "0xeCD22E8924620fa5991267a5c65B57F4a982Eb15",
    },
  },
  {
    id: "USDC",

    source: {
      chainId: ChainId.ETHEREUM,
      collateralAssetAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

      lendingPoolAddressesProviderAddress:
        "0xC965590E1Ca4a1031Fc3B97771C1B98CD4C24182",
    },
  },
];
