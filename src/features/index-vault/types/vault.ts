import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

import type { VaultType } from "./indexVault";

export interface PercentageYields {
  annualPercentageYield: number;
  monthlyPercentageYield: number;
  weeklyPercentageYield: number;
  annualPercentageRate: number;
}

export interface Vault {
  vaultAddress: string;
  chainId: ChainId;
  type: VaultType;
  priceFeedAddress: string;
  assetSymbol: string;
  collateralSymbol: string;
  expiry: number;
  period: number;
  valuePerLP: Big;
  balance: Big;
  collatCap: Big;
  assetPrice: number;
  strikePrice: number | null;
  percentageYields: PercentageYields;
  annualPercentageYield: number;
  isSettled: boolean;
  isExpired: boolean;
}
