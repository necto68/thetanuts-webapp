import type { ComponentType } from "react";

import {
  Avax,
  Bnb,
  Eth,
  IndexEth,
  Ftm,
  Matic,
  Usdc,
  IndexUsdc,
  IndexBtc,
  Ust,
  Frax,
  Btc,
  Busd,
  Sol,
  Boba,
  Cro,
  Ada,
  Bch,
  Aurora,
  Near,
  Arb,
} from "../components";

export const logosMap: Record<string, ComponentType> = {
  AVAX: Avax,
  BNB: Bnb,
  ETH: Eth,
  indexETH: IndexEth,
  "ETH.e": Eth,
  FTM: Ftm,
  MATIC: Matic,
  USDC: Usdc,
  indexUSDC: IndexUsdc,
  UST: Ust,
  FRAX: Frax,
  BTC: Btc,
  indexBTC: IndexBtc,
  BTCB: Btc,
  BUSD: Busd,
  SOL: Sol,
  BOBA: Boba,
  CRO: Cro,
  ADA: Ada,
  BCH: Bch,
  AURORA: Aurora,
  NEAR: Near,
  ARBITRUM: Arb,
};
