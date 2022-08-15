import type Big from "big.js";

import type { ChainId } from "../../wallet/constants";

export enum VaultType {
  CALL = "CALL",
  PUT = "PUT",
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
  collateralDecimals: number;
  collateralTokenAddress: string;
  riskLevel: RiskLevel | null;
  epoch: number;
  expiry: number;
  period: number;
  valuePerLP: Big;
  balance: Big;
  remainder: number;
  collatCap: Big;
  assetPrice: number;
  collateralPrice: number;
  strikePrice: number | null;
  percentageYields: PercentageYields;
  annualPercentageYield: number;
  isSettled: boolean;
  isExpired: boolean;
}
