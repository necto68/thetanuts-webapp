import type { ComponentType } from "react";

import { Avax, Bnb, Eth, Ftm, Matic } from "../components";

export const logosMap: Record<string, ComponentType> = {
  AVAX: Avax,
  BNB: Bnb,
  ETH: Eth,
  FTM: Ftm,
  MATIC: Matic,
};
