import { longVaults } from "../../basic/constants";
import { useBasicVaults } from "../../basic-vault/hooks";
import { useLongVaultsReaders } from "../../long-vault/hooks";
import type { LongVaultRow } from "../types";
import { useFilteredBasicVaultsIds } from "../../basic/hooks";

export const useLongVaultsTableRows = (): (LongVaultRow | undefined)[] => {
  const filteredLongVaultsIds = useFilteredBasicVaultsIds(longVaults);

  const longVaultsQueries = useBasicVaults(filteredLongVaultsIds);
  const longVaultsReaderQueries = useLongVaultsReaders(filteredLongVaultsIds);

  const longVaultsData = longVaultsQueries.map(({ data }) => data);

  const longVaultsReadersData = longVaultsReaderQueries.map(({ data }) => data);

  return longVaultsData.map((longVault, index) => {
    const longVaultReader = longVaultsReadersData[index];

    if (!longVault || !longVaultReader) {
      return undefined;
    }

    const { currentContractsPosition } = longVaultReader;

    return {
      ...longVault,
      currentContractsPosition,
    };
  });
};