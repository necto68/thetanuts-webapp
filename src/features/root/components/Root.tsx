import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import { ThetaIndexPage } from "../../theta-index/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal } from "../../modal/components";
import { Sidebar } from "../../sidebar/components";
import { PagePathname } from "../types";

import { Header } from "./Header";
import { Container, PageContainer } from "./Root.styles";

export const Root = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Modal />
      <Sidebar />
      <PageContainer pathname={pathname as PagePathname}>
        <Header />
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
    </Container>
  );
};
