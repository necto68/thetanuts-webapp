import { Route, Switch, Redirect } from "react-router-dom";

import { ThetaIndexPage } from "../../theta-index/components";
import { BasicPage } from "../../basic/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal } from "../../modal/components";
import { Sidebar } from "../../sidebar/components";
import { SidebarStateProvider } from "../../sidebar/providers";
import { CurrentDateProvider } from "../../basic-vault/providers";
import { RouterPathname } from "../types";
import { useWalletAutoConnect } from "../hooks";
import { useCurrentPagePathname } from "../hooks/useCurrentPagePathname";

import { MobileHeader } from "./MobileHeader";
import {
  BackgroundContainer,
  Container,
  GridContainer,
  LayoutContainer,
  MobileHeaderContainer,
  PageContainer,
  SidebarContainer,
} from "./Root.styles";

export const Root = () => {
  const currentPagePathname = useCurrentPagePathname();

  useWalletAutoConnect();

  return (
    <CurrentDateProvider>
      <SidebarStateProvider>
        <Container>
          <BackgroundContainer pathname={currentPagePathname}>
            <Modal />
            <LayoutContainer>
              <GridContainer>
                <SidebarContainer>
                  <Sidebar />
                </SidebarContainer>
                <MobileHeaderContainer>
                  <MobileHeader />
                </MobileHeaderContainer>
                <PageContainer>
                  <Switch>
                    <Route
                      exact
                      path={[
                        RouterPathname.thetaIndex,
                        RouterPathname.indexVaultModal,
                      ]}
                    >
                      <ThetaIndexPage />
                    </Route>
                    <Route
                      exact
                      path={[
                        RouterPathname.basic,
                        RouterPathname.basicVaultModal,
                      ]}
                    >
                      <BasicPage />
                    </Route>
                    <Route exact path={RouterPathname.portfolio}>
                      <PortfolioPage />
                    </Route>
                    <Route>
                      <Redirect to={RouterPathname.thetaIndex} />
                    </Route>
                  </Switch>
                </PageContainer>
              </GridContainer>
            </LayoutContainer>
          </BackgroundContainer>
        </Container>
      </SidebarStateProvider>
    </CurrentDateProvider>
  );
};
