import { basicVaults } from "../../basic/constants";
import { useBasicVaults, useBasicVaultReaders } from "../../basic-vault/hooks";
import type { BasicVaultRow } from "../types";
import { VaultModalType } from "../../root/types";
import { VaultType } from "../../basic-vault/types";

export const useBasicPositionsRows = (): (BasicVaultRow | undefined)[] => {
  const basicVaultsIds = basicVaults.map(({ id }) => id);
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
      type,
      chainId,
      assetSymbol,
      collateralSymbol,
      collateralPrice,
      annualPercentageYield,
    } = data;

    const { totalPosition } = basicVaultReader;

    return {
      id,
      vaultType: VaultModalType.basic,
      chainId,
      assetSymbol,
      collateralSymbol: type === VaultType.PUT ? collateralSymbol : undefined,
      assetPrice: collateralPrice,
      balance: totalPosition,
      symbol: collateralSymbol,
      annualPercentageYield,
    };
  });
};
