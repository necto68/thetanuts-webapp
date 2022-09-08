import type { BasicVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const productionBasicVaults: BasicVaultConfig[] = [
  // mainnet - eth call a/b/c
  {
    id: "TN-CSCCv1-ETHUSD-A",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x17a1f890da8fDd479a52937E3eb62b52235c68C5",
    },
  },
  {
    id: "TN-CSCCv1-ETHUSD-B",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x28d604Ac5A841141791CeD298515381fdC3605B7",
    },
  },
  {
    id: "TN-CSCCv1-ETHUSD-C",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3be620c362a175A0c914e170AAfaE08022e7378B",
    },
  },

  // mainnet - btc call a/b/c
  {
    id: "TN-CSCCv1-BTCUSD-A",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x1104230B3006ce137E8251Ea797E9e8938097Fca",
    },
  },
  {
    id: "TN-CSCCv1-BTCUSD-B",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xBdA5c42815E72a9ED48a9D3d8Dd62a2f491D1Ed4",
    },
  },
  {
    id: "TN-CSCCv1-BTCUSD-C",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3864fd723235B11d0A7Bba8EB68FD35172D2A109",
    },
  },

  // mainnet - eth put a/b
  {
    id: "TN-CSCPv1-ETHUSD-A",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xA92b00dF2B056211B24466687014A160588a5274",
    },
  },
  {
    id: "TN-CSCPv1-ETHUSD-B",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xd6B7cE2BD328998Bb519304752619238BC2242DF",
    },
  },

  // mainnet - btc put
  {
    id: "TN-CSCPv1-BTCUSD",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x7B372439E75a4Dc57BbaE8843e03d240F7600158",
    },
  },

  // mainnet - avax put
  {
    id: "TN-CSCPv1-AVAXUSD",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xCb846ADaBBB608933EBD1F8f2b2B9388b7c6571D",
    },
  },

  // mainnet - sol put
  {
    id: "TN-CSCPv1-SOLUSD",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xC7B354259aD25cBefdca8515851895AD8f06F3E4",
    },
  },

  // mainnet - matic put
  {
    id: "TN-CSCPv1-MATICUSD",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x38F83Bd0cceC5204530370a7524700b1c84C7bd1",
    },
  },

  // mainnet - bnb put
  {
    id: "TN-CSCPv1-BNBUSD",

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xE6741a3b7984Ef8C50D609cF3B0aD2F392Fd3160",
    },
  },

  // bsc - ada call
  {
    id: "TN-CSCCv1-ADAUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x0A7c0D6B3b70904B62A14f6a05B01306535e60fC",
    },
  },

  // bsc - bch call
  {
    id: "TN-CSCCv1-BCHUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x27c74d6779fba8243aB37AB880CA3D812b5096ca",
    },
  },

  // bsc - ada put
  {
    id: "TN-CSCPv1-ADAUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x950b4E6701abd41bd8c5E17cBFcB7E06da6baB51",
    },
  },

  // bsc - bch put
  {
    id: "TN-CSCPv1-BCHUSD",

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x7009369f1Cf3d02BD7Cc3cBa8142089AC14406B9",
    },
  },

  // fantom - ftm call
  {
    id: "TN-CSCCv1-FTMUSD",

    source: {
      chainId: ChainId.FANTOM,
      basicVaultAddress: "0xa79137eF0E33899fcd2CaAeD809Fbf58208fbcE9",
    },
  },

  // fantom - ftm put
  {
    id: "TN-CSCPv1-FTMUSD",

    source: {
      chainId: ChainId.FANTOM,
      basicVaultAddress: "0xB20B3a5E4b9573e7B3b8DA1BA938c9471AD3B8dD",
    },
  },

  // boba - boba call
  {
    id: "TN-CSCCv1-BOBAUSD",

    source: {
      chainId: ChainId.BOBA,
      basicVaultAddress: "0xC0c69D17f3821Ef7423364a942677f91434F1d19",
    },
  },

  // cro - cro call
  {
    id: "TN-CSCCv1-CROUSD",

    source: {
      chainId: ChainId.CRONOS,
      basicVaultAddress: "0xEc9284b92B8039c4180Ac99863ed73Ee5Ff33E63",
    },
  },
];
