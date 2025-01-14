import type { match } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import { useQueryParameters } from "../../shared/hooks/useQueryParameters";
import type { VaultModalRouteParameters } from "../../root/types";
import { ModalPathname, PagePathname, VaultModalType } from "../../root/types";
import { indexVaultsMap } from "../../theta-index/constants";
import { basicVaultsMap, longVaultsMap } from "../../basic/constants";
import { ModalContentType } from "../../index-vault-modal/types";

import { useVaultModalState } from "./useVaultModalState";

const vaultsMaps = {
  [VaultModalType.index]: indexVaultsMap,
  [VaultModalType.basic]: basicVaultsMap,
  [VaultModalType.degen]: basicVaultsMap,
  [VaultModalType.wheel]: basicVaultsMap,
  [VaultModalType.long]: longVaultsMap,
  [VaultModalType.longTrade]: longVaultsMap,
};

const getVaultType = (
  vaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  indexVaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  basicVaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  degenVaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  wheelVaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  longVaultModalUrlMatch: match<VaultModalRouteParameters> | null,
  longTradeVaultModalUrlMatch: match<VaultModalRouteParameters> | null
) => {
  switch (vaultModalUrlMatch) {
    case indexVaultModalUrlMatch:
      return VaultModalType.index;
    case basicVaultModalUrlMatch:
      return VaultModalType.basic;
    case degenVaultModalUrlMatch:
      return VaultModalType.degen;
    case wheelVaultModalUrlMatch:
      return VaultModalType.wheel;
    case longVaultModalUrlMatch:
      return VaultModalType.long;
    case longTradeVaultModalUrlMatch:
      return VaultModalType.longTrade;
    default:
      return null;
  }
};

// eslint-disable-next-line complexity
export const useSetVaultModalState = () => {
  const [vaultModalState, setVaultModalState] = useVaultModalState();

  const routerHistory = useHistory();
  const queryParameters = useQueryParameters();

  const indexPageUrlMatch = useRouteMatch(PagePathname.thetaIndex);
  const basicPageUrlMatch = useRouteMatch(PagePathname.basic);
  const degenPageUrlMatch = useRouteMatch(PagePathname.degen);
  const wheelPageUrlMatch = useRouteMatch(PagePathname.wheel);
  const longPageUrlMatch = useRouteMatch(PagePathname.long);
  const longTradePageUrlMatch = useRouteMatch(PagePathname.longTrade);

  const pageUrlMatch =
    indexPageUrlMatch ??
    basicPageUrlMatch ??
    degenPageUrlMatch ??
    wheelPageUrlMatch ??
    longPageUrlMatch ??
    longTradePageUrlMatch;

  const indexVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.indexVaultModal
  );
  const basicVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.basicVaultModal
  );
  const degenVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.degenVaultModal
  );
  const wheelVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.wheelVaultModal
  );
  const longVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.longVaultModal
  );
  const longTradeVaultModalUrlMatch = useRouteMatch<VaultModalRouteParameters>(
    ModalPathname.longTradeVaultModal
  );

  const vaultModalUrlMatch =
    indexVaultModalUrlMatch ??
    basicVaultModalUrlMatch ??
    degenVaultModalUrlMatch ??
    wheelVaultModalUrlMatch ??
    longVaultModalUrlMatch ??
    longTradeVaultModalUrlMatch;

  const vaultType = getVaultType(
    vaultModalUrlMatch,
    indexVaultModalUrlMatch,
    basicVaultModalUrlMatch,
    degenVaultModalUrlMatch,
    wheelVaultModalUrlMatch,
    longVaultModalUrlMatch,
    longTradeVaultModalUrlMatch
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
      const vaultsMap = vaultsMaps[vaultType];

      if (vaultsMap[vaultId]) {
        const chainId = Number(queryParameters.get("chain"));

        setVaultModalState((previousState) => ({
          ...previousState,
          vaultType,
          vaultId,
          chainId,
          isShow: true,
          contentType: ModalContentType.swap,
        }));
      } else {
        routerHistory.push(pageUrlMatch.path);
      }
    }

    // Close vault modal on router change.
    if (!vaultModalUrlMatch && vaultModalState.isShow) {
      setVaultModalState((previousState) => ({
        ...previousState,
        isShow: false,
        isBoostContentShown: false,
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

  useEffect(() => {
    if (vaultId) {
      setVaultModalState((previousState) => ({
        ...previousState,
        vaultId,
      }));
    }
  }, [vaultId, setVaultModalState]);
};
