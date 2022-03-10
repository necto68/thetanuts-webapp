import Big from "big.js";
import type { BigNumber } from "ethers";

import type { Vault } from "../types";

export const convertToBig = (value: BigNumber): Big =>
  new Big(value.toString());

export const normalizeVaultValue = (
  value: Big,
  divisor: Big,
  roundDP = 2
): number => value.div(divisor).round(roundDP).toNumber();

export const getPercentageYields = (
  totalAsset: Big,
  premium: Big,
  period: Big
): Record<string, number> => {
  if (totalAsset.eq(0)) {
    return {
      annualPercentageYield: 0,
      monthlyPercentageYield: 0,
      weeklyPercentageYield: 0,
      annualPercentageRate: 0,
    };
  }

  const interestRate = premium.div(totalAsset);

  const secondsPerDay = new Big(60 * 60 * 24);
  const compoundingFactor = secondsPerDay.div(period);
  const getCompoundingPeriods = (days: number) =>
    compoundingFactor.mul(days).round().toNumber();

  const baseValue = new Big(1).add(interestRate);

  const annualYield = baseValue.pow(getCompoundingPeriods(365)).sub(1);
  const monthlyYield = baseValue.pow(getCompoundingPeriods(30)).sub(1);
  const weeklyYield = baseValue.pow(getCompoundingPeriods(7)).sub(1);
  const annualRate = interestRate.div(period).mul(secondsPerDay.mul(365));

  const convertToPercentage = (yieldValue: Big): number =>
    yieldValue.mul(100).round(2).toNumber();

  const annualPercentageYield: number = convertToPercentage(annualYield);
  const monthlyPercentageYield: number = convertToPercentage(monthlyYield);
  const weeklyPercentageYield: number = convertToPercentage(weeklyYield);
  const annualPercentageRate: number = convertToPercentage(annualRate);

  return {
    annualPercentageYield,
    monthlyPercentageYield,
    weeklyPercentageYield,
    annualPercentageRate,
  };
};

export const getCurrentDepositRate = (
  currentDeposit: Vault["currentDeposit"],
  maxDeposit: Vault["maxDeposit"]
): number | null =>
  currentDeposit && maxDeposit && maxDeposit.gt(0)
    ? currentDeposit.div(maxDeposit).mul(100).round(2).toNumber()
    : null;
