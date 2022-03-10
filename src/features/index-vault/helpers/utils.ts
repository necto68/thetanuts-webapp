import Big from "big.js";

import type { IndexVault, Vault } from "../types";
import type { PercentageYields } from "../../vault/types";

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
