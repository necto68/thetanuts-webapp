import { ChainId } from "../../wallet/constants";
import type { CollateralAssetConfig } from "../types";

export const developCollateralAssets: CollateralAssetConfig[] = [
  {
    id: "tWETH",

    source: {
      chainId: ChainId.POLYGON,
      collateralAssetAddress: "0x6BA28c5a069455ccB6a25723acDf2Eec0A436Db6",

      lendingPoolAddressesProviderAddress:
        "0xeCD22E8924620fa5991267a5c65B57F4a982Eb15",
    },
  },
];
