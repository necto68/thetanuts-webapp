import type Big from "big.js";

export interface Vault {
  valuePerLP: Big;
  assetPrice: number;
  annualPercentageYield: number;
}
