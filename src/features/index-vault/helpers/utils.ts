import Big from "big.js";

import type { IndexVault } from "../types";
import type { PercentageYields, BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";

const getYield = (
  baseValue: number,
  compoundingFactor: number,
  periodDays: number
) => baseValue ** (compoundingFactor * periodDays) - 1;

const convertYieldToPercentage = (yieldValue: number): number =>
  new Big(yieldValue).mul(100).round(2).toNumber();

export const getTotalValueLocked = (
  vaults: (BasicVault | undefined)[],
  vaultsInfos: IndexVault["vaultsInfos"],
  assetPrice: number
): number => {
  const vaultAssetValues = vaults.map((vault, index) => {
    if (!vault || !vaultsInfos[index]) {
      return new Big(0);
    }

    const { lpAmount } = vaultsInfos[index];
    const { valuePerLP } = vault;

    // lpAmount * valuePerLP
    return lpAmount.mul(valuePerLP);
  });

  const vaultAssetValuesSum = vaultAssetValues.reduce(
    (accumulator, current) => accumulator.add(current),
    new Big(0)
  );

  return vaultAssetValuesSum.mul(assetPrice).round(0).toNumber();
};

export const normalizeVaultValue = (
  value: Big,
  divisor: Big,
  roundDP = 2
): number => value.div(divisor).round(roundDP).toNumber();

export const getTotalPercentageYields = (
  vaults: (BasicVault | undefined)[],
  vaultsInfos: IndexVault["vaultsInfos"],
  totalWeight: IndexVault["totalWeight"]
): PercentageYields => {
  const defaultPercentageYields = {
    annualPercentageYield: new Big(0),
    monthlyPercentageYield: new Big(0),
    weeklyPercentageYield: new Big(0),
    annualPercentageRate: new Big(0),
  };

  const vaultPercentageYieldsValues = vaults.map((vault, index) => {
    if (!vault || !vaultsInfos[index]) {
      return defaultPercentageYields;
    }

    const { weight } = vaultsInfos[index];
    const { percentageYields } = vault;
    const {
      annualPercentageYield,
      monthlyPercentageYield,
      weeklyPercentageYield,
      annualPercentageRate,
    } = percentageYields;

    // weight / totalWeight * percentageYield
    return {
      annualPercentageYield: weight.div(totalWeight).mul(annualPercentageYield),

      monthlyPercentageYield: weight
        .div(totalWeight)
        .mul(monthlyPercentageYield),

      weeklyPercentageYield: weight.div(totalWeight).mul(weeklyPercentageYield),
      annualPercentageRate: weight.div(totalWeight).mul(annualPercentageRate),
    };
  });

  const totalPercentageYields = vaultPercentageYieldsValues.reduce(
    (accumulator, current) => ({
      annualPercentageYield: accumulator.annualPercentageYield.add(
        current.annualPercentageYield
      ),

      monthlyPercentageYield: accumulator.monthlyPercentageYield.add(
        current.monthlyPercentageYield
      ),

      weeklyPercentageYield: accumulator.weeklyPercentageYield.add(
        current.weeklyPercentageYield
      ),

      annualPercentageRate: accumulator.annualPercentageRate.add(
        current.annualPercentageRate
      ),
    }),
    defaultPercentageYields
  );

  return {
    annualPercentageYield: totalPercentageYields.annualPercentageYield
      .round(2)
      .toNumber(),

    monthlyPercentageYield: totalPercentageYields.monthlyPercentageYield
      .round(2)
      .toNumber(),

    weeklyPercentageYield: totalPercentageYields.weeklyPercentageYield
      .round(2)
      .toNumber(),

    annualPercentageRate: totalPercentageYields.annualPercentageRate
      .round(2)
      .toNumber(),
  };
};

export const getPercentageYields = (
  amount: Big,
  premium: Big,
  period: number
): PercentageYields => {
  if (amount.eq(0)) {
    return {
      annualPercentageYield: 0,
      monthlyPercentageYield: 0,
      weeklyPercentageYield: 0,
      annualPercentageRate: 0,
    };
  }

  const interestRate = premium.div(amount);

  const secondsPerDay = new Big(60 * 60 * 24);
  const compoundingFactor = secondsPerDay.div(period).toNumber();

  const baseValue = new Big(1).add(interestRate).toNumber();

  const annualYield = getYield(baseValue, compoundingFactor, 365);
  const monthlyYield = getYield(baseValue, compoundingFactor, 30);
  const weeklyYield = getYield(baseValue, compoundingFactor, 7);
  const annualRate = interestRate
    .div(period)
    .mul(secondsPerDay.mul(365))
    .toNumber();

  const annualPercentageYield = convertYieldToPercentage(annualYield);
  const monthlyPercentageYield = convertYieldToPercentage(monthlyYield);
  const weeklyPercentageYield = convertYieldToPercentage(weeklyYield);
  const annualPercentageRate = convertYieldToPercentage(annualRate);

  return {
    annualPercentageYield,
    monthlyPercentageYield,
    weeklyPercentageYield,
    annualPercentageRate,
  };
};

export const getTotalRemainder = (vaults: (BasicVault | undefined)[]) => {
  const vaultsBalances = vaults.map((vault) =>
    vault ? vault.balance : new Big(0)
  );

  const vaultsRemainders = vaults.map((vault) =>
    vault ? new Big(vault.remainder) : new Big(0)
  );

  const totalBalance = vaultsBalances.reduce(
    (accumulator, current) => accumulator.add(current),
    new Big(0)
  );

  const remaindersValues = vaultsRemainders.map((remainder, index) =>
    vaultsBalances[index].gt(0)
      ? remainder.div(vaultsBalances[index].div(totalBalance))
      : remainder
  );

  const sortedRemaindersValues = Array.from(remaindersValues).sort((a, b) =>
    a.cmp(b)
  );

  return sortedRemaindersValues[0].round(0, Big.roundDown).toNumber();
};

export const getVaultTypeTitle = (type: VaultType): string =>
  type === VaultType.CALL ? "Covered Call" : "Put Selling";
