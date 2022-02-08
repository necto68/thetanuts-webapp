import type { Provider } from "@ethersproject/providers";
import { WebSocketProvider } from "@ethersproject/providers";

import type { Chain } from "../types";

export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  BSC = 56,
  MATIC = 137,
  AVALANCHE = 43_114,
  FANTOM = 250,
}

export const chains: Chain[] = [
  {
    chainId: ChainId.ETHEREUM,
    title: "Ethereum",
    color: "#ffffff",
    rpcUrl: "wss://main-light.eth.linkpool.io/ws",
  },
  {
    chainId: ChainId.RINKEBY,
    title: "Rinkeby Test",
    color: "#ffffff",
    rpcUrl: "wss://rinkeby-light.eth.linkpool.io/ws",
  },
  {
    chainId: ChainId.BSC,
    title: "BSC",
    color: "#f0b90a",
    rpcUrl: "wss://bsc-ws-node.nariox.org:443",
  },
  {
    chainId: ChainId.MATIC,
    title: "Matic",
    color: "#7b43d9",
    rpcUrl: "wss://ws-mainnet.matic.network",
  },
  {
    chainId: ChainId.AVALANCHE,
    title: "Avalanche",
    color: "#dc3e3f",
    rpcUrl: "wss://api.avax.network/ext/bc/C/ws",
  },
  {
    chainId: ChainId.FANTOM,
    title: "Fantom",
    color: "#3eb6e9",
    rpcUrl: "wss://wsapi.fantom.network",
  },
];

export const chainsMap: Record<number, Chain> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain])
);

export const chainProvidersMap: Record<number, Provider> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, new WebSocketProvider(chain.rpcUrl)])
);
