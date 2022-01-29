import type { FC } from "react";

import { Eth, Bnb, Polygon, Avax, Ftm } from "../../logo/components";

import { ChainId } from "./chains";

export const chainLogosMap: Record<number, FC> = {
  [ChainId.ETHEREUM]: Eth,
  [ChainId.RINKEBY]: Eth,
  [ChainId.BSC]: Bnb,
  [ChainId.POLYGON]: Polygon,
  [ChainId.AVALANCHE]: Avax,
  [ChainId.FANTOM]: Ftm,
};
