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
  {
    id: "WBNB",

    source: {
      chainId: ChainId.BSC,
      collateralAssetAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",

      lendingPoolAddressesProviderAddress:
        "0xE3C0715811EfFfD7298E25eDFBf723275D8BD5df",
    },
  },
  {
    id: "BUSD",

    source: {
      chainId: ChainId.BSC,
      collateralAssetAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",

      lendingPoolAddressesProviderAddress:
        "0x201002211CA46E7577411b5F1D45B7d9d19271e0",
    },
  },
];
