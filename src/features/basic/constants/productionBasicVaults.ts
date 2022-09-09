import type { BasicVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const productionBasicVaults: BasicVaultConfig[] = [
  // mainnet - eth call a/b/c
  {
    id: "TN-CSCCv1-ETHUSD-A",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x9014f8E90423766343Ed4fe41668563526dF6715",
    },
  },

  // {
  //   id: "TN-CSCCv1-ETHUSD-B",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0x28d604Ac5A841141791CeD298515381fdC3605B7",
  //   },
  // },
  // {
  //   id: "TN-CSCCv1-ETHUSD-C",
  //   isFeatured: true,

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0x3be620c362a175A0c914e170AAfaE08022e7378B",
  //   },
  // },

  // mainnet - btc call a/b/c
  {
    id: "TN-CSCCv1-BTCUSD-A",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x60a4422B6B52aEF50647c67F29D6a7e6DAc3CCBC",
    },
  },

  // {
  //   id: "TN-CSCCv1-BTCUSD-B",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xBdA5c42815E72a9ED48a9D3d8Dd62a2f491D1Ed4",
  //   },
  // },
  // {
  //   id: "TN-CSCCv1-BTCUSD-C",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0x3864fd723235B11d0A7Bba8EB68FD35172D2A109",
  //   },
  // },

  // mainnet - eth put a/b
  {
    id: "TN-CSCPv1-ETHUSD-A",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x6d2Cdb589BE6037Df1AeA5dC433829aD5aF30013",
    },
  },

  // {
  //   id: "TN-CSCPv1-ETHUSD-B",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xd6B7cE2BD328998Bb519304752619238BC2242DF",
  //   },
  // },

  // mainnet - btc put
  {
    id: "TN-CSCPv1-BTCUSD",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3BA337F3167eA35910E6979D5BC3b0AeE60E7d59",
    },
  },

  // mainnet - avax put
  // {
  //   id: "TN-CSCPv1-AVAXUSD",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xCb846ADaBBB608933EBD1F8f2b2B9388b7c6571D",
  //   },
  // },

  // mainnet - sol put
  // {
  //   id: "TN-CSCPv1-SOLUSD",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xC7B354259aD25cBefdca8515851895AD8f06F3E4",
  //   },
  // },

  // mainnet - matic put
  // {
  //   id: "TN-CSCPv1-MATICUSD",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0x38F83Bd0cceC5204530370a7524700b1c84C7bd1",
  //   },
  // },

  // mainnet - bnb put
  // {
  //   id: "TN-CSCPv1-BNBUSD",

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xE6741a3b7984Ef8C50D609cF3B0aD2F392Fd3160",
  //   },
  // },

  // bsc - ada call
  {
    id: "TN-CSCCv1-ADAUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xF98297A842f52Cd1f6c6f5f003Cd701813b1C461",
    },
  },

  // bsc - bch call
  {
    id: "TN-CSCCv1-BCHUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xc879ecC0d2cdA26072e9049178a99B26C51eDF8a",
    },
  },

  // bsc - ada put
  {
    id: "TN-CSCPv1-ADAUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x8BE731cB3b301b4a209C1A38ea14D6438e6913F6",
    },
  },

  // bsc - bch put
  {
    id: "TN-CSCPv1-BCHUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xfe9B8054B947aCEeC01912Cf1811DB06fc804b69",
    },
  },

  // fantom - ftm call
  {
    id: "TN-CSCCv1-FTMUSD",

    source: {
      chainId: ChainId.FANTOM,
      basicVaultAddress: "0x302ABD505757FD355C8ef3cF8b4918D6404f4996",
    },
  },

  // fantom - ftm put
  {
    id: "TN-CSCPv1-FTMUSD",

    source: {
      chainId: ChainId.FANTOM,
      basicVaultAddress: "0x7EDa4C29726355D0d8E85001B9152158b35Eae4f",
    },
  },

  // boba - boba call
  {
    id: "TN-CSCCv1-BOBAUSD",

    source: {
      chainId: ChainId.BOBA,
      basicVaultAddress: "0x5a9f1D95C59365613B4224e690Bb4971DD246142",
    },
  },

  // cro - cro call
  {
    id: "TN-CSCCv1-CROUSD",

    source: {
      chainId: ChainId.CRONOS,
      basicVaultAddress: "0x99F05418967d3596CAfd260913b682Fd9b0CBB40",
    },
  },
];
