import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { LendingPoolAbi__factory as LendingPoolAbiFactory } from "../../contracts/types";
import type { LendingPoolReader } from "../types";

const defaultLendingPoolReader: LendingPoolReader = {
  liquidityIndex: null,
  variableBorrowIndex: null,
  currentLiquidityRate: null,
  currentVariableBorrowRate: null,
  currentStableBorrowRate: null,
  lastUpdateTimestamp: null,
  suppliedTokenAddress: null,
  shouldShowBoost: null,
  stableDebtTokenAddress: null,
  variableDebtTokenAddress: null,
  interestRateStrategyAddress: null,
  lPoolId: null,
};

export const lendingPoolReaderFetcher = async (
  lPoolAddress: string,
  basicVaultId: string,
  basicVaultAddress: string,
  account: string,
  provider: Provider
): Promise<LendingPoolReader> => {
  if (!account) {
    return defaultLendingPoolReader;
  }

  const lPoolContract = LendingPoolAbiFactory.connect(lPoolAddress, provider);

  const [lendingPoolPosition] = await Promise.all([
    lPoolContract.getReserveData(basicVaultAddress),
  ]);

  const liquidityIndex = new Big(lendingPoolPosition[1].toString());
  const variableBorrowIndex = new Big(lendingPoolPosition[2].toString());
  const currentLiquidityRate = new Big(lendingPoolPosition[3].toString()).div(
    "1e25"
  );
  const currentVariableBorrowRate = new Big(
    lendingPoolPosition[4].toString()
  ).div("1e25");
  const currentStableBorrowRate = new Big(lendingPoolPosition[5].toString());
  const lastUpdateTimestamp = new Big(lendingPoolPosition[6].toString());
  const suppliedTokenAddress = lendingPoolPosition[7].toString();
  const stableDebtTokenAddress = lendingPoolPosition[8].toString();
  const variableDebtTokenAddress = lendingPoolPosition[9].toString();
  const interestRateStrategyAddress = lendingPoolPosition[10].toString();
  const lPoolId = new Big(lendingPoolPosition[11].toString());

  const shouldShowBoost =
    suppliedTokenAddress !== "" &&
    suppliedTokenAddress !== "0x0000000000000000000000000000000000000000";

  return {
    liquidityIndex,
    variableBorrowIndex,
    currentLiquidityRate,
    currentVariableBorrowRate,
    currentStableBorrowRate,
    lastUpdateTimestamp,
    suppliedTokenAddress,
    shouldShowBoost,
    stableDebtTokenAddress,
    variableDebtTokenAddress,
    interestRateStrategyAddress,
    lPoolId,
  };
};
