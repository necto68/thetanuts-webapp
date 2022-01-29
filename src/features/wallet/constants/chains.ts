import type { Chain } from "../types";

export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  BSC = 56,
  POLYGON = 137,
  AVALANCHE = 43_114,
  FANTOM = 250,
}

export const chains: Chain[] = [
  { chainId: ChainId.ETHEREUM, title: "Ethereum", color: "#ffffff" },
  { chainId: ChainId.RINKEBY, title: "Rinkeby Test", color: "#ffffff" },
  { chainId: ChainId.BSC, title: "BSC", color: "#f0b90a" },
  { chainId: ChainId.POLYGON, title: "Polygon", color: "#7b43d9" },
  { chainId: ChainId.AVALANCHE, title: "Avalanche", color: "#dc3e3f" },
  { chainId: ChainId.FANTOM, title: "Fantom", color: "#3eb6e9" },
];

export const chainsMap: Record<number, Chain> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain])
);
