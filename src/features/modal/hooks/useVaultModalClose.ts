import { useHistory } from "react-router-dom";
import { useCallback } from "react";

import { PagePathname, VaultModalType } from "../../root/types";

import { useVaultModalState } from "./useVaultModalState";

/**
 * Hook that return graceful modal close method.
 */
export const useVaultModalClose = () => {
  const [{ isRouterModal, vaultType }, setVaultModalState] =
    useVaultModalState();
  const routerHistory = useHistory();

  return useCallback(() => {
    if (isRouterModal) {
      const pathname =
        vaultType === VaultModalType.index
          ? PagePathname.thetaIndex
          : PagePathname.basic;
      routerHistory.push(pathname);
    } else {
      setVaultModalState((previousState) => ({
        ...previousState,
        isShow: false,
      }));
    }
  }, [isRouterModal, vaultType, setVaultModalState, routerHistory]);
};
