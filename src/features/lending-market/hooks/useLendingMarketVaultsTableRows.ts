import { lendingMarketVaults } from "../../basic/constants";
import { useBasicVaults } from "../../basic-vault/hooks";
import { useLendingMarketVaultsReaders } from "../../lending-market-vault/hooks";
import type { LendingMarketVaultRow } from "../types";

export const useLendingMarketVaultsTableRows = (): (
  | LendingMarketVaultRow
  | undefined
)[] => {
  const lendingMarketVaultsIds = lendingMarketVaults.map(({ id }) => id);

  const lendingMarketVaultsQueries = useBasicVaults(lendingMarketVaultsIds);
  const lendingMarketVaultsReaderQueries = useLendingMarketVaultsReaders(
    lendingMarketVaultsIds
  );

  const lendingMarketVaultsData = lendingMarketVaultsQueries.map(
    ({ data }) => data
  );

  const lendingMarketVaultsReadersData = lendingMarketVaultsReaderQueries.map(
    ({ data }) => data
  );

  return lendingMarketVaultsData.map((lendingMarketVault, index) => {
    const lendingMarketVaultReader = lendingMarketVaultsReadersData[index];

    if (!lendingMarketVault || !lendingMarketVaultReader) {
      return undefined;
    }

    return {
      ...lendingMarketVault,
      totalPosition: lendingMarketVaultReader.totalPosition,
    };
  });
};
