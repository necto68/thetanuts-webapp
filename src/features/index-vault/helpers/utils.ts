import Big from "big.js";

import type { IndexVault, Vault, PercentageYields } from "../types";

export const getTotalValueLocked = (
  vaults: (Vault | undefined)[],
  vaultsInfos: IndexVault["vaultsInfos"]
): number => {
  const vaultAssetValues = vaults.map((vault, index) => {
    if (!vault || !vaultsInfos[index]) {
      return new Big(0);
    }

    const { lpAmount } = vaultsInfos[index];
    const { valuePerLP, assetPrice } = vault;

    // lpAmount * valuePerLP * assetPrice
    return lpAmount.mul(valuePerLP).mul(assetPrice);
  });

  const totalValueLocked = vaultAssetValues.reduce(
    (accumulator, current) => accumulator.add(current),
    new Big(0)
  );

  return totalValueLocked.round(0).toNumber();
};

export const normalizeVaultValue = (
  value: Big,
  divisor: Big,
  roundDP = 2
): number => value.div(divisor).round(roundDP).toNumber();

export const getTotalPercentageYields = (
  vaults: (Vault | undefined)[],
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
  totalAsset: Big,
  premium: Big,
  period: number
): PercentageYields => {
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

export const getTotalRemainder = (vaults: (Vault | undefined)[]) => {
  const vaultsBalances = vaults.map((vault) =>
    vault ? vault.balance : new Big(0)
  );

  const vaultsRemainders = vaults.map((vault) =>
    vault ? vault.collatCap.sub(vault.balance) : new Big(0)
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
