import type { BasicVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const developBasicVaults: BasicVaultConfig[] = [
  {
    id: "TN-CSCCv0-ETHUSD-1DAY",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x6BA28c5a069455ccB6a25723acDf2Eec0A436Db6",
    },
  },
  {
    id: "TN-CSCCv0-ETHUSD-2DAY",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x619761Cf639DD8D30d671CE6bC912A75a79B8f34",
    },
  },
  {
    id: "TN-CSCCv0-ETHUSD-3DAY",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0xb375b56cAf4eD3b31b44c431E30Cc4Cb344D7f0F",
    },
  },
];
