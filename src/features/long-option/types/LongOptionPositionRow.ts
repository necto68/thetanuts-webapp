import type Big from "big.js";

export interface LongOptionPositionRow {
  id: string;
  title: string;
  side: string;
  size: Big;
  symbol: string;
}
