import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { useQueryParameters } from "../../shared/hooks/useQueryParameters";
import { ModalPathname, PagePathname } from "../../root/types";
import { indexVaultsMap } from "../constants";

// TODO: return when we will have direct deposit
// eslint-disable-next-line max-len
// import { ModalContentType } from "../../index-vault-modal/types/modalContentType";

export const useIndexVaultModalOpen = () => {
  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();
  const routerHistory = useHistory();
  const queryParameters = useQueryParameters();
  const indexVaultModalUrlMatch = useRouteMatch<{
    vaultId: string;
  }>(ModalPathname.indexVaultModal);
  const indexPageUrlMatch = useRouteMatch(PagePathname.thetaIndex);

  useEffect(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isRouterModal: true,
    }));

    return () => {
      setIndexVaultModalState((previousState) => ({
        ...previousState,
        isRouterModal: false,
      }));
    };
  }, [setIndexVaultModalState]);

  useEffect(() => {
    // Open vault modal on router change.
    if (indexVaultModalUrlMatch && !indexVaultModalState.isShow) {
      const { vaultId } = indexVaultModalUrlMatch.params;

      if (indexVaultsMap[vaultId]) {
        const chainId = Number(queryParameters.get("chain"));
        setIndexVaultModalState((previousState) => ({
          ...previousState,
          indexVaultId: vaultId,
          chainId,
          isShow: true,

          // TODO: return when we will have direct deposit
          // contentType: ModalContentType.swap,
        }));
      } else {
        routerHistory.push(PagePathname.thetaIndex);
      }
    }

    // Close vault modal on router change.
    if (!indexVaultModalUrlMatch && indexVaultModalState.isShow) {
      setIndexVaultModalState((previousState) => ({
        ...previousState,
        isShow: false,
      }));
    }

    // Redirect to index page when navigated with unmatched url.
    if (!indexVaultModalUrlMatch && !indexPageUrlMatch?.isExact) {
      routerHistory.push(PagePathname.thetaIndex);
    }
  }, [
    indexVaultModalUrlMatch,
    indexPageUrlMatch,
    indexVaultModalState,
    queryParameters,
    setIndexVaultModalState,
    routerHistory,
  ]);
};
