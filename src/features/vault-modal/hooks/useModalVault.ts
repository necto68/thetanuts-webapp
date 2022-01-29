import { useVault } from "../../vault/hooks";

import { useModalState } from "./useModalState";

export const useModalVault = () => {
  const [{ vaultAddress }] = useModalState();

  return useVault(vaultAddress);
};
