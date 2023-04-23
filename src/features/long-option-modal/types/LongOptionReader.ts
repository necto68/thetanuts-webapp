import type Big from "big.js";

export interface LongOptionReader {
  inputValue: string;
  LPToBorrowValue: Big;
  minToReceiveValue: Big;
  swapLeverage: number | null;
}
