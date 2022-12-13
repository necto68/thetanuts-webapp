import { useLongVaultsReaders } from "./useLongVaultsReaders";

export const useLongVaultReader = (basicVaultId: string) => {
  const longVaultsReaders = useLongVaultsReaders([basicVaultId]);

  return longVaultsReaders[0];
};
