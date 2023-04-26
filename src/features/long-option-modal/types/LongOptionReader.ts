import type Big from "big.js";

export interface LongOptionReader {
  inputValue: string;
  LPToBorrowValue: Big;
  minToReceiveLPValue: Big;
  swapLeverage: number | null;
}
