import type { Provider } from "@ethersproject/providers";
import { WebSocketProvider } from "@ethersproject/providers";

import { Eth, Bnb, Matic, Avax, Ftm } from "../../logo/components";
import type { ChainConfig } from "../types";

export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  BSC = 56,
  MATIC = 137,
  AVALANCHE = 43_114,
  FANTOM = 250,
}

export const chains: ChainConfig[] = [
  {
    chainId: ChainId.ETHEREUM,
    title: "Ethereum",
    color: "#ffffff",
    logo: Eth,
    rpcUrl: "wss://main-light.eth.linkpool.io/ws",

    addresses: {
      routerAddress: "testAddress",
      lendingPoolAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.RINKEBY,
    title: "Rinkeby Test",
    color: "#ffffff",
    logo: Eth,
    rpcUrl: "wss://rinkeby-light.eth.linkpool.io/ws",

    addresses: {
      routerAddress: "testAddress",
      lendingPoolAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.BSC,
    title: "BSC",
    color: "#f0b90a",
    logo: Bnb,
    rpcUrl: "wss://bsc-ws-node.nariox.org:443",

    addresses: {
      routerAddress: "testAddress",
      lendingPoolAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.MATIC,
    title: "Matic",
    color: "#7b43d9",
    logo: Matic,
    rpcUrl: "wss://ws-mainnet.matic.network",

    addresses: {
      routerAddress: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      lendingPoolAddress: "0x69CB7e57FC301785aA0f933230DEE4C3E1f78e2b",
    },
  },
  {
    chainId: ChainId.AVALANCHE,
    title: "Avalanche",
    color: "#dc3e3f",
    logo: Avax,
    rpcUrl: "wss://api.avax.network/ext/bc/C/ws",

    addresses: {
      routerAddress: "testAddress",
      lendingPoolAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.FANTOM,
    title: "Fantom",
    color: "#3eb6e9",
    logo: Ftm,
    rpcUrl: "wss://wsapi.fantom.network",

    addresses: {
      routerAddress: "testAddress",
      lendingPoolAddress: "testAddress",
    },
  },
];

export const chainsMap: Record<number, ChainConfig> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain])
);

export const chainProvidersMap: Record<number, Provider> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, new WebSocketProvider(chain.rpcUrl)])
);
