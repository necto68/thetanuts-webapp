import { useIndexVaults } from "./useIndexVaults";

export const useIndexVault = (indexVaultId: string) => {
  const indexVaults = useIndexVaults([indexVaultId]);

  return indexVaults[0];
};
