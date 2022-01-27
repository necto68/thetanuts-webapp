import { useVaults } from './useVaults';

export const useVault = (vaultAddress: string | null) => {
  const vaults = useVaults();

  if (!vaultAddress) {
    return undefined;
  }

  return vaults.find(({ address }) => address === vaultAddress);
};
