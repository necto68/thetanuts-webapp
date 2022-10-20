import type { Token } from "../../index-vault-modal/types";

export interface CollateralAsset {
  id: string;
  token: Token;
  loanToValue: number;
  availableLeverage: number;
  priceOracleAddress: string;
}
