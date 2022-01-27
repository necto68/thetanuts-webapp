import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useScreenSize } from '../hooks';
import { Header } from './Header';
import { ProductsPage } from '../../products/components';
import { PortfolioPage } from '../../portfolio/components';
import { Modal } from '../../modal/components';

const RootContainer = styled.div<{ screenHeight: number }>`
  background: radial-gradient(
    66.3% 234.24% at 50% 50%,
    #444974 0%,
    #010101 100%
  );
  min-height: ${(props) =>
    props.screenHeight ? `${props.screenHeight}px` : `100vh`};
`;

export const Root = () => {
  const { height: screenHeight } = useScreenSize();

  return (
    <RootContainer id="appRoot" screenHeight={screenHeight}>
      <Modal />
      <Header />
      <Switch>
        <Route path="/products" exact>
          <ProductsPage />
        </Route>
        <Route path="/portfolio" exact>
          <PortfolioPage />
        </Route>
        <Route>
          <Redirect to={`/products`} />
        </Route>
      </Switch>
    </RootContainer>
  );
};
