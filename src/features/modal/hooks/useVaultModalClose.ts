import { useHistory } from "react-router-dom";
import { useCallback } from "react";

import { getPagePathname } from "../../root/helpers/utils";

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
      const pathname = getPagePathname(vaultType);

      routerHistory.push(pathname);
    } else {
      setVaultModalState((previousState) => ({
        ...previousState,
        isShow: false,
        isBoostContentShown: false,
      }));
    }
  }, [isRouterModal, vaultType, setVaultModalState, routerHistory]);
};
