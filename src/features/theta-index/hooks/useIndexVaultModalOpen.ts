import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { useQueryParameters } from "../../shared/hooks/useQueryParameters";
import { ModalPathname, PagePathname } from "../../root/types";
import { indexVaultsMap } from "../constants";
import type { IndexVaultModalState } from "../../shared/hooks";

// TODO: return when we will have direct deposit
// eslint-disable-next-line max-len
// import { ModalContentType } from "../../index-vault-modal/types/modalContentType";

export const useIndexVaultModalOpen = () => {
  const [vaultModalState, setVaultModalState] = useIndexVaultModalState();
  const routerHistory = useHistory();
  const queryParameters = useQueryParameters();
  const vaultModalUrlMatch = useRouteMatch(ModalPathname.indexVaultModal);
  const indexPageUrlMatch = useRouteMatch(PagePathname.thetaIndex);

  useEffect(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      isRouterModal: true,
    }));

    return () => {
      setVaultModalState((previousState) => ({
        ...previousState,
        isRouterModal: false,
      }));
    };
  }, [setVaultModalState]);

  useEffect(() => {
    // Open vault modal on router change.
    if (vaultModalUrlMatch && !vaultModalState.isShow) {
      const { indexVaultId } = vaultModalUrlMatch.params as {
        indexVaultId: string;
      };

      if (indexVaultsMap[indexVaultId]) {
        const chainId = Number(queryParameters.get("chain"));
        setVaultModalState((previousState: IndexVaultModalState) => ({
          ...previousState,
          indexVaultId,
          chainId,
          isShow: true,

          // contentType: ModalContentType.swap,
        }));
      } else {
        routerHistory.push(PagePathname.thetaIndex);
      }
    }

    // Close vault modal on router change.
    if (!vaultModalUrlMatch && vaultModalState.isShow) {
      setVaultModalState((previousState) => ({
        ...previousState,
        isShow: false,
      }));
    }

    // Redirect to index page when navigated with unmatched url.
    if (!vaultModalUrlMatch && !indexPageUrlMatch?.isExact) {
      routerHistory.push(PagePathname.thetaIndex);
    }
  }, [
    vaultModalUrlMatch,
    indexPageUrlMatch,
    vaultModalState,
    queryParameters,
    setVaultModalState,
    routerHistory,
  ]);
};
