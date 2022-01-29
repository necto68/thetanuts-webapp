import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { ProductTypeButton } from "./ProductTypeButton";
import { AdvancedProducts } from "./AdvancedProducts";
import {
  Container,
  PageTitle,
  ProductsContainer,
  SwitcherContainer,
} from "./ProductsPage.styles";

enum ProductsType {
  basic = "basic",
  advanced = "advanced",
}

export const ProductsPage = () => {
  const [productsType, setProductType] = useState(ProductsType.basic);

  return (
    <Container>
      <PageTitle>Products</PageTitle>
      {/* <Metrix/> */}
      <ProductsContainer>
        <SwitcherContainer>
          <ProductTypeButton
            active={productsType === ProductsType.basic}
            onClick={() => {
              setProductType(ProductsType.basic);
            }}
          >
            Basic
          </ProductTypeButton>
          <ProductTypeButton
            active={productsType === ProductsType.advanced}
            onClick={() => {
              setProductType(ProductsType.advanced);
            }}
          >
            Advanced
          </ProductTypeButton>
        </SwitcherContainer>
        <AnimatePresence exitBeforeEnter initial={false}>
          {productsType === ProductsType.basic ? (
            <AdvancedProducts key={ProductsType.basic} />
          ) : (
            <AdvancedProducts key={ProductsType.advanced} />
          )}
        </AnimatePresence>
      </ProductsContainer>
    </Container>
  );
};
