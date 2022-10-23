import type { Token } from "../../index-vault-modal/types";

export interface CollateralAsset {
  id: string;
  collateralToken: Token;
  aToken: Token;
  loanToValue: number;
  collateralPrice: number;
  availableLeverage: number;
  lendingPoolAddress: string;
  priceOracleAddress: string;
}
