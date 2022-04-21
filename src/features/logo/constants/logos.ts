import type { ComponentType } from "react";

import {
  Avax,
  Bnb,
  Eth,
  Ftm,
  Matic,
  Usdc,
  Ust,
  Frax,
  Btc,
} from "../components";

export const logosMap: Record<string, ComponentType> = {
  AVAX: Avax,
  BNB: Bnb,
  ETH: Eth,
  FTM: Ftm,
  MATIC: Matic,
  USDC: Usdc,
  UST: Ust,
  FRAX: Frax,
  BTC: Btc,
};
