import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";

import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { useQueryParameters } from "../../shared/hooks/useQueryParameters";
import { PagePathname } from "../../root/types";
import type { IndexVaultModalState } from "../../shared/hooks";
import { indexVaultsMap } from "../constants";

import { Header } from "./Header";
import { ThetaIndexLayout } from "./ThetaIndexLayout";
import { Container } from "./ThetaIndexPage.styles";

export const ThetaIndexPage = () => {
  const [vaultModalState, setVaultModalState] = useIndexVaultModalState();
  const routerHistory = useHistory();
  const queryParameters = useQueryParameters();
  const vaultModalUrlMatch = useRouteMatch(PagePathname.indexVaultModal);
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
      const chainId = Number(queryParameters.get("chain"));

      if (indexVaultsMap[indexVaultId]) {
        setVaultModalState((previousState: IndexVaultModalState) => ({
          ...previousState,
          isShow: true,
          indexVaultId,
          chainId,
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

  return (
    <Container>
      <Header />
      <ThetaIndexLayout />
    </Container>
  );
};
