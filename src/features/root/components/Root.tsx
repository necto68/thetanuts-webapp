import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import { ThetaIndexPage } from "../../theta-index/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal } from "../../modal/components";
import { Sidebar } from "../../sidebar/components";
import { SidebarStateProvider } from "../../sidebar/providers";
import { PagePathname } from "../types";

import { MobileHeader } from "./MobileHeader";
import { Container, LayoutContainer, PageContainer } from "./Root.styles";

export const Root = () => {
  const { pathname } = useLocation();

  return (
    <SidebarStateProvider>
      <Container>
        <Modal />
        <Sidebar />
        <LayoutContainer pathname={pathname as PagePathname}>
          <MobileHeader />
          <PageContainer>
            <Switch>
              <Route exact path={PagePathname.thetaIndex}>
                <ThetaIndexPage />
              </Route>
              <Route exact path={PagePathname.portfolio}>
                <PortfolioPage />
              </Route>
              <Route>
                <Redirect to={PagePathname.thetaIndex} />
              </Route>
            </Switch>
          </PageContainer>
        </LayoutContainer>
      </Container>
    </SidebarStateProvider>
  );
};
