import { longVaults } from "../../basic/constants";
import { useBasicVaults } from "../../basic-vault/hooks";
import { useLongVaultsReaders } from "../../long-vault/hooks";
import type { LongVaultRow } from "../types";

export const useLongVaultsTableRows = (): (LongVaultRow | undefined)[] => {
  const longVaultsIds = longVaults.map(({ id }) => id);

  const longVaultsQueries = useBasicVaults(longVaultsIds);
  const longVaultsReaderQueries = useLongVaultsReaders(longVaultsIds);

  const longVaultsData = longVaultsQueries.map(({ data }) => data);

  const longVaultsReadersData = longVaultsReaderQueries.map(({ data }) => data);

  return longVaultsData.map((longVault, index) => {
    const longVaultReader = longVaultsReadersData[index];

    if (!longVault || !longVaultReader) {
      return undefined;
    }

    const { totalContractsPosition } = longVaultReader;

    return {
      ...longVault,
      totalContractsPosition,
    };
  });
};
