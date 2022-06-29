import { Route, Switch, useLocation } from "react-router-dom";

import { ThetaIndexPage } from "../../theta-index/components";
import { BasicPage } from "../../basic/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal } from "../../modal/components";
import { Sidebar } from "../../sidebar/components";
import { SidebarStateProvider } from "../../sidebar/providers";
import { CurrentDateProvider } from "../../basic-vault/providers";
import { PagePathname } from "../types";
import { useWalletAutoConnect } from "../hooks";

import { MobileHeader } from "./MobileHeader";
import {
  Container,
  BackgroundContainer,
  LayoutContainer,
  GridContainer,
  SidebarContainer,
  MobileHeaderContainer,
  PageContainer,
} from "./Root.styles";

export const Root = () => {
  const { pathname } = useLocation();

  useWalletAutoConnect();

  return (
    <CurrentDateProvider>
      <SidebarStateProvider>
        <Container>
          <BackgroundContainer pathname={pathname as PagePathname}>
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
                    <Route exact path={PagePathname.thetaIndex}>
                      <ThetaIndexPage />
                    </Route>
                    <Route exact path={PagePathname.basic}>
                      <BasicPage />
                    </Route>
                    <Route exact path={PagePathname.portfolio}>
                      <PortfolioPage />
                    </Route>
                    <Route path="*">
                      <ThetaIndexPage />
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
