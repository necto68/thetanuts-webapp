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
];
