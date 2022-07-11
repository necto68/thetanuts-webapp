import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

export enum VaultType {
  CALL = "CALL",
  PUT = "PUT",
}

export interface PercentageYields {
  annualPercentageYield: number;
  monthlyPercentageYield: number;
  weeklyPercentageYield: number;
  annualPercentageRate: number;
}

export interface BasicVault {
  id: string;
  basicVaultAddress: string;
  chainId: ChainId;
  type: VaultType;
  priceFeedAddress: string;
  assetSymbol: string;
  collateralSymbol: string;
  collateralTokenAddress: string;
  expiry: number;
  period: number;
  valuePerLP: Big;
  balance: Big;
  remainder: number;
  collatCap: Big;
  assetPrice: number;
  strikePrice: number | null;
  percentageYields: PercentageYields;
  annualPercentageYield: number;
  isSettled: boolean;
  isExpired: boolean;
}
