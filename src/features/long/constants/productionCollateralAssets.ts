import { ChainId } from "../../wallet/constants";
import type { CollateralAssetConfig } from "../types";

export const productionCollateralAssets: CollateralAssetConfig[] = [
  {
    id: "USDC",

    source: {
      chainId: ChainId.ETHEREUM,
      collateralAssetAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

      lendingPoolAddressesProviderAddress:
        "0xC965590E1Ca4a1031Fc3B97771C1B98CD4C24182",
    },
  },
  {
    id: "WMATIC",

    source: {
      chainId: ChainId.POLYGON,
      collateralAssetAddress: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",

      lendingPoolAddressesProviderAddress:
        "0x4925b00EC8697bEbF5a2335510131DD3E58efD9F",
    },
  },
];
