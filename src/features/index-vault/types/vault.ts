import type Big from "big.js";

export interface Vault {
  vaultAddress: string;
  priceFeedAddress: string;
  assetSymbol: string;
  expiry: number;
  valuePerLP: Big;
  assetPrice: number;
  strikePrice: number | null;
  annualPercentageYield: number;
  isSettled: boolean;
  isExpired: boolean;
}
