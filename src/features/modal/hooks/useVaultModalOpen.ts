import type { match } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import { useQueryParameters } from "../../shared/hooks/useQueryParameters";
import type { VaultModalRouteParameters } from "../../root/types";
import { ModalPathname, PagePathname, VaultModalType } from "../../root/types";
import { indexVaultsMap } from "../../theta-index/constants";
import { basicVaultsMap } from "../../basic/constants";
import { ModalContentType } from "../../index-vault-modal/types";

import { useVaultModalState } from "./useVaultModalState";

const getVaultType = (
  vaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  indexVaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  basicVaultModalUrlMatch: match<VaultModalRouteParameters> | null
) => {
  if (vaultModalUrlMatch && vaultModalUrlMatch === indexVaultModalUrlMatch) {
    return VaultModalType.index;
  }

  if (vaultModalUrlMatch && vaultModalUrlMatch === basicVaultModalUrlMatch) {
    return VaultModalType.basic;
  }

  return null;
};

export const useVaultModalOpen = () => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();

  const routerHistory = useHistory();
  const queryParameters = useQueryParameters();

  const indexPageUrlMatch = useRouteMatch(PagePathname.thetaIndex);
  const basicPageUrlMatch = useRouteMatch(PagePathname.basic);

  // both of them will be matched, because "/basic" route also will match "/"
  // so we need to check basicPageUrlMatch before indexPageUrlMatch
  const pageUrlMatch = basicPageUrlMatch ?? indexPageUrlMatch;

  const indexVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.indexVaultModal
  );
  const basicVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.basicVaultModal
  );
  const vaultModalUrlMatch = indexVaultModalUrlMatch ?? basicVaultModalUrlMatch;

  const vaultType = getVaultType(
    vaultModalUrlMatch,
    indexVaultModalUrlMatch,
    basicVaultModalUrlMatch
  );
  const vaultId = vaultModalUrlMatch?.params.vaultId;

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

    if (vaultType && vaultId && !vaultModalState.isShow && pageUrlMatch) {
      const vaultsMap =
        vaultType === VaultModalType.index ? indexVaultsMap : basicVaultsMap;
      if (vaultsMap[vaultId]) {
        const chainId = Number(queryParameters.get("chain"));
        setVaultModalState({
          vaultType,
          vaultId,
          chainId,
          isShow: true,
          contentType: ModalContentType.swap,
        });
      } else {
        routerHistory.push(pageUrlMatch.path);
      }
    }

    // Close vault modal on router change.
    if (!vaultModalUrlMatch && vaultModalState.isShow) {
      setVaultModalState((previousState) => ({
        ...previousState,
        isShow: false,
      }));
    }
  }, [
    vaultModalUrlMatch,
    pageUrlMatch,
    vaultModalState,
    queryParameters,
    setVaultModalState,
    routerHistory,
    vaultType,
    vaultId,
  ]);
};
