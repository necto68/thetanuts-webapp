import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { useScreenSize } from "../hooks";
import { ThetaIndexPage } from "../../theta-index/components";
import { ProductsPage } from "../../products/components";
import { PortfolioPage } from "../../portfolio/components";
import { Modal } from "../../modal/components";

import { Header } from "./Header";

const RootContainer = styled.div<{ screenHeight: number }>`
  background: linear-gradient(180deg, #031a34 21.13%, #259ddf 99.41%);
  min-height: ${(props) =>
    props.screenHeight ? `${props.screenHeight}px` : "100vh"};
`;

export const Root = () => {
  const { height: screenHeight } = useScreenSize();

  return (
    <RootContainer id="appRoot" screenHeight={screenHeight}>
      <Modal />
      <Header />
      <Switch>
        <Route exact path="/theta-index">
          <ThetaIndexPage />
        </Route>
        <Route exact path="/products">
          <ProductsPage />
        </Route>
        <Route exact path="/portfolio">
          <PortfolioPage />
        </Route>
        <Route>
          <Redirect to="/theta-index" />
        </Route>
      </Switch>
    </RootContainer>
  );
};
