import { basicVaults, degenVaults, wheelVaults } from "../../basic/constants";
import { useBasicVaults, useBasicVaultReaders } from "../../basic-vault/hooks";
import type { BasicVaultRow } from "../types";
import { getVaultModalType } from "../../basic/helpers";

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

    const vaultType = getVaultModalType(basicVaultType);

    const { depositPending, withdrawalPending, currentPosition } =
      basicVaultReader;

    return {
      id,
      vaultType,
      type,
      chainId,
      assetSymbol,
      collateralSymbol,
      assetPrice: collateralPrice,
      currentPosition,
      depositPending,
      withdrawalPending,
      symbol: collateralSymbol,
      annualPercentageYield,
    };
  });
};
