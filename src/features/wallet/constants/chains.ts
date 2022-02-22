import type { JsonRpcProvider } from "@ethersproject/providers";
import { WebSocketProvider } from "@ethersproject/providers";

import { Eth, Bnb, Matic, Avax, Ftm } from "../../logo/components";
import type { ChainConfig } from "../types";

export enum ChainId {
  ETHEREUM = 1,
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
    explorerUrl: "https://etherscan.io/",

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
    explorerUrl: "https://bscscan.com/",

    addresses: {
      routerAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      lendingPoolAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.MATIC,
    title: "Matic",
    color: "#7b43d9",
    logo: Matic,
    rpcUrl: "wss://rpc-mainnet.matic.quiknode.pro",
    explorerUrl: "https://polygonscan.com/",

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
    explorerUrl: "https://snowtrace.io/",

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
    explorerUrl: "https://ftmscan.com/",

    addresses: {
      routerAddress: "testAddress",
      lendingPoolAddress: "testAddress",
    },
  },
];

export const chainsMap: Record<ChainId, ChainConfig> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain])
) as unknown as Record<ChainId, ChainConfig>;

export const chainProvidersMap: Record<ChainId, JsonRpcProvider> =
  Object.fromEntries(
    chains.map((chain) => [chain.chainId, new WebSocketProvider(chain.rpcUrl)])
  ) as unknown as Record<ChainId, JsonRpcProvider>;
