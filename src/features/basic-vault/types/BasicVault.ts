import type Big from "big.js";

import type { BasicVaultType } from "../../basic/types";
import type { ChainId } from "../../wallet/constants";

export enum VaultType {
  CALL = "CALL",
  PUT = "PUT",
  CONDOR = "CONDOR",
}

export enum RiskLevel {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export interface PercentageYields {
  annualPercentageYield: number;
  monthlyPercentageYield: number;
  weeklyPercentageYield: number;
  periodPercentageYield: number;
  annualPercentageRate: number;
}

export interface BasicVault {
  id: string;
  basicVaultType: BasicVaultType;
  basicVaultAddress: string;
  chainId: ChainId;
  type: VaultType;
  priceFeedAddress: string;
  assetSymbol: string;
  collateralSymbol: string;
  collateralDecimals: number;
  collateralTokenAddress: string;
  epoch: number;
  expiry: number;
  period: number;
  valuePerLP: Big;
  balance: Big;
  remainder: number;
  collatCap: Big;
  feePerYear: number;
  assetPrice: number;
  collateralPrice: number;
  strikePrices: number[];
  percentageYields: PercentageYields;
  annualPercentageYield: number;
  isSettled: boolean;
  isExpired: boolean;
  isAllowInteractions: boolean;
}
