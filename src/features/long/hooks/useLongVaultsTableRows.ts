import { longVaults } from "../../basic/constants";
import { useBasicVaults } from "../../basic-vault/hooks";
import { useLongVaultsReaders } from "../../long-vault/hooks";
import type { LongVaultRow } from "../types";
import { useSortedBasicVaultsIds } from "../../basic/hooks";

export const useLongVaultsTableRows = (): (LongVaultRow | undefined)[] => {
  const sortedLongVaultsIds = useSortedBasicVaultsIds(longVaults);

  const longVaultsQueries = useBasicVaults(sortedLongVaultsIds);
  const longVaultsReaderQueries = useLongVaultsReaders(sortedLongVaultsIds);

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
