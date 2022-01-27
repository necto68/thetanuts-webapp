import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { ProductTypeButton } from './ProductTypeButton';
import { AdvancedProducts } from './AdvancedProducts';

export enum ProductsTypes {
  basic = 'basic',
  advanced = 'advanced',
}

export const ProductsPage = () => {
  const [productsType, setProductType] = useState(ProductsTypes.basic);

  return (
    <Container>
      <PageTitle>Products</PageTitle>
      {/*<Metrix/>*/}
      <ProductsContainer>
        <SwitcherContainer>
          <ProductTypeButton
            active={productsType === ProductsTypes.basic}
            onClick={() => setProductType(ProductsTypes.basic)}
          >
            Basic
          </ProductTypeButton>
          <ProductTypeButton
            active={productsType === ProductsTypes.advanced}
            onClick={() => setProductType(ProductsTypes.advanced)}
          >
            Advanced
          </ProductTypeButton>
        </SwitcherContainer>
        <AnimatePresence initial={false} exitBeforeEnter>
          {productsType === ProductsTypes.basic ? (
            <AdvancedProducts key={ProductsTypes.basic} />
          ) : (
            <AdvancedProducts key={ProductsTypes.advanced} />
          )}
        </AnimatePresence>
      </ProductsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 0 25px;
`;

const PageTitle = styled.h1`
  font-family: Roboto;
  font-weight: 700;
  font-size: 48px;
  color: #e5e5e5;
  margin: 0;
`;

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px;
  border-bottom: 1px solid #4857b9;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #010c1a;
  border-radius: 10px;
`;
