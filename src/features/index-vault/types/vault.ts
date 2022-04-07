import type Big from "big.js";

import type { PercentageYields } from "../../vault/types";

export interface Vault {
  vaultAddress: string;
  priceFeedAddress: string;
  assetSymbol: string;
  expiry: number;
  period: number;
  valuePerLP: Big;
  assetPrice: number;
  strikePrice: number | null;
  percentageYields: PercentageYields;
  annualPercentageYield: number;
  isSettled: boolean;
  isExpired: boolean;
}
