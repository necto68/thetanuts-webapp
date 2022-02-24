import { Redirect, Route, Switch } from "react-router-dom";

import { ThetaIndexPage } from "../../theta-index/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal } from "../../modal/components";
import { Sidebar } from "../../sidebar/components";

import { Header } from "./Header";
import { Container, PageContainer } from "./Root.styles";

export const Root = () => (
  <Container>
    <Modal />
    <Sidebar />
    <PageContainer>
      <Header />
      <Switch>
        <Route exact path="/theta-index">
          <ThetaIndexPage />
        </Route>
        <Route exact path="/portfolio">
          <PortfolioPage />
        </Route>
        <Route>
          <Redirect to="/theta-index" />
        </Route>
      </Switch>
    </PageContainer>
  </Container>
);
