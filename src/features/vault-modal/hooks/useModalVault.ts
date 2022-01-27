import { useModalState } from './useModalState';
import { useVault } from '../../vault/hooks';

export const useModalVault = () => {
  const [{ vaultAddress }] = useModalState();

  return useVault(vaultAddress);
};
