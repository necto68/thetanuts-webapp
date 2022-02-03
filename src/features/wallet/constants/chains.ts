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
    rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  {
    chainId: ChainId.RINKEBY,
    title: "Rinkeby Test",
    color: "#ffffff",
    rpcUrl: "https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  {
    chainId: ChainId.BSC,
    title: "BSC",
    color: "#f0b90a",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  {
    chainId: ChainId.MATIC,
    title: "Matic",
    color: "#7b43d9",
    rpcUrl: "https://polygon-rpc.com",
  },
  {
    chainId: ChainId.AVALANCHE,
    title: "Avalanche",
    color: "#dc3e3f",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
  {
    chainId: ChainId.FANTOM,
    title: "Fantom",
    color: "#3eb6e9",
    rpcUrl: "https://rpc.ftm.tools/",
  },
];

export const chainsMap: Record<number, Chain> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain])
);
