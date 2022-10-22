import type { Token } from "../../index-vault-modal/types";

export interface CollateralAsset {
  id: string;
  token: Token;
  loanToValue: number;
  availableLeverage: number;
  lendingPoolAddress: string;
  priceOracleAddress: string;
}
