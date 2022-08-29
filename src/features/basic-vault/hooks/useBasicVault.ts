import { useBasicVaults } from "./useBasicVaults";

export const useBasicVault = (basicVaultId: string) => {
  const basicVaults = useBasicVaults([basicVaultId]);

  return basicVaults[0];
};
