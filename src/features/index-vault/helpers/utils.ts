import Big from "big.js";

import type { IndexVault, Vault } from "../types";

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

export const getTotalAnnualPercentageYield = (
  vaults: (Vault | undefined)[],
  vaultsInfos: IndexVault["vaultsInfos"],
  totalWeight: IndexVault["totalWeight"]
): number => {
  const vaultAnnualPercentageYieldValues = vaults.map((vault, index) => {
    if (!vault || !vaultsInfos[index]) {
      return new Big(0);
    }

    const { weight } = vaultsInfos[index];
    const { annualPercentageYield } = vault;

    // weight / totalWeight * annualPercentageYield
    return weight.div(totalWeight).mul(annualPercentageYield);
  });

  const totalAnnualPercentageYield = vaultAnnualPercentageYieldValues.reduce(
    (accumulator, current) => accumulator.add(current),
    new Big(0)
  );

  return totalAnnualPercentageYield.round(2).toNumber();
};
