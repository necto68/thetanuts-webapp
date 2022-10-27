import { useLendingMarketVaultsReaders } from "./useLendingMarketVaultsReaders";

export const useLendingMarketVaultReader = (basicVaultId: string) => {
  const lendingMarketVaultsReaders = useLendingMarketVaultsReaders([
    basicVaultId,
  ]);

  return lendingMarketVaultsReaders[0];
};
