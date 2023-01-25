import { basicVaults, degenVaults, wheelVaults } from "../../basic/constants";
import { useBasicVaults, useBasicVaultReaders } from "../../basic-vault/hooks";
import type { BasicVaultRow } from "../types";
import { VaultModalType } from "../../root/types";
import { BasicVaultType } from "../../basic/types";

export const useBasicPositionsRows = (): (BasicVaultRow | undefined)[] => {
  const basicVaultsArray = basicVaults.concat(degenVaults).concat(wheelVaults);
  const basicVaultsIds = basicVaultsArray.map(({ id }) => id);

  const basicVaultsQueries = useBasicVaults(basicVaultsIds);
  const basicVaultReadersQueries = useBasicVaultReaders(basicVaultsIds);

  return basicVaultsQueries.map(({ data }, basicVaultIndex) => {
    const { data: basicVaultReader } =
      basicVaultReadersQueries[basicVaultIndex];

    if (!data || !basicVaultReader) {
      return undefined;
    }

    const {
      id,
      basicVaultType,
      type,
      chainId,
      assetSymbol,
      collateralSymbol,
      collateralPrice,
      annualPercentageYield,
    } = data;

    const { depositPending, totalPosition } = basicVaultReader;
    const balance =
      depositPending && totalPosition
        ? depositPending.add(totalPosition)
        : null;

    const isDegen = basicVaultType === BasicVaultType.DEGEN;

    return {
      id,
      vaultType: isDegen ? VaultModalType.degen : VaultModalType.basic,
      type,
      chainId,
      assetSymbol,
      collateralSymbol,
      assetPrice: collateralPrice,
      balance,
      symbol: collateralSymbol,
      annualPercentageYield,
    };
  });
};
