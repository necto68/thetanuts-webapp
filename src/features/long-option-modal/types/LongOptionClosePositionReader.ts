import type Big from "big.js";

export interface LongOptionClosePositionReader {
  inputValue: string;
  minToReceiveCollateralValue: Big | null;
}
