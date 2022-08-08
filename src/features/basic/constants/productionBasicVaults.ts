import type { BasicVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const productionBasicVaults: BasicVaultConfig[] = [
  {
    id: "TN-CSCPv1-BTCUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x7B372439E75a4Dc57BbaE8843e03d240F7600158",
    },
  },
  {
    id: "TN-CSCPv1-ETHUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xd6B7cE2BD328998Bb519304752619238BC2242DF",
    },
  },
  {
    id: "TN-CSCPv1-AVAXUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xCb846ADaBBB608933EBD1F8f2b2B9388b7c6571D",
    },
  },
  {
    id: "TN-CSCPv1-SOLUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xC7B354259aD25cBefdca8515851895AD8f06F3E4",
    },
  },
  {
    id: "TN-CSCPv1-MATICUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x38F83Bd0cceC5204530370a7524700b1c84C7bd1",
    },
  },
  {
    id: "TN-CSCPv1-BNBUSD",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xE6741a3b7984Ef8C50D609cF3B0aD2F392Fd3160",
    },
  },
  {
    id: "TN-CSCCv1-ETHUSD-A",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x28d604Ac5A841141791CeD298515381fdC3605B7",
    },
  },
  {
    id: "TN-CSCCv1-ETHUSD-B",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3be620c362a175A0c914e170AAfaE08022e7378B",
    },
  },
  {
    id: "TN-CSCCv1-BTCUSD-A",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xBdA5c42815E72a9ED48a9D3d8Dd62a2f491D1Ed4",
    },
  },
  {
    id: "TN-CSCCv1-BTCUSD-B",
    isFeatured: true,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3864fd723235B11d0A7Bba8EB68FD35172D2A109",
    },
  },
];
