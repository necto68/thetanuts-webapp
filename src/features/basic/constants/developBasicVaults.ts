import type { BasicVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const developBasicVaults: BasicVaultConfig[] = [
  {
    id: "TN-CSCCv0-ETHUSD-1DAY",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0xAC332bA8b1B75a7aC04964aB5fA26AE2ddCB7c38",
    },
  },
  {
    id: "TN-CSCCv0-ETHUSD-2DAY",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0xfBeAcC9Ea393e0abd1F5cd90E8B9fFFBf0188799",
    },
  },
  {
    id: "TN-CSCCv0-ETHUSD-3DAY",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0xc86C567E7cB007684ce4551CD5f8D2494aC71187",
    },
  },
  {
    id: "TN-CSCCv0-MATICUSD-14DAY",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x86b16F0eC0F08770491Cfd2E761030b04D9A4fC5",
    },
  },
];
