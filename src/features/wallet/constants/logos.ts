import { FC } from 'react';
import { ChainIds } from './chains';
import { ETH, BNB, Polygon, AVAX, FTM } from '../../logo/components';

export const chainLogosMap: Record<number, FC> = {
  [ChainIds.ETHEREUM]: ETH,
  [ChainIds.RINKEBY_TEST]: ETH,
  [ChainIds.BSC]: BNB,
  [ChainIds.POLYGON]: Polygon,
  [ChainIds.AVALANCHE]: AVAX,
  [ChainIds.FANTOM]: FTM,
};
