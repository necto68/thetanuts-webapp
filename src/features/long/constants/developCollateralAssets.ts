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
];
