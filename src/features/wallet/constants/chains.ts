import { Chain } from '../types';

export enum ChainIds {
  ETHEREUM = 1,
  RINKEBY_TEST = 4,
  BSC = 56,
  POLYGON = 137,
  AVALANCHE = 43114,
  FANTOM = 250,
}

export const chains: Chain[] = [
  { chainId: ChainIds.ETHEREUM, title: 'Ethereum', color: '#ffffff' },
  { chainId: ChainIds.RINKEBY_TEST, title: 'Rinkeby Test', color: '#ffffff' },
  { chainId: ChainIds.BSC, title: 'BSC', color: '#f0b90a' },
  { chainId: ChainIds.POLYGON, title: 'Polygon', color: '#7b43d9' },
  { chainId: ChainIds.AVALANCHE, title: 'Avalanche', color: '#dc3e3f' },
  { chainId: ChainIds.FANTOM, title: 'Fantom', color: '#3eb6e9' },
];

export const chainsMap: Record<number, Chain> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain]),
);
