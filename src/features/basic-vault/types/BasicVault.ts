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
  collateralDecimals: number;
  collateralTokenAddress: string;
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
