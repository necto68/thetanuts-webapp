import type Big from "big.js";

export interface LendingPoolReader {
  liquidityIndex: Big | null;
  variableBorrowIndex: Big | null;
  currentLiquidityRate: Big | null;
  currentVariableBorrowRate: Big | null;
  currentStableBorrowRate: Big | null;
  lastUpdateTimestamp: Big | null;
  aTokenAddress: string | null;
  stableDebtTokenAddress: string | null;
  variableDebtTokenAddress: string | null;
  interestRateStrategyAddress: string | null;
  lPoolId: Big | null;

}
