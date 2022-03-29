import { useCallback } from "react";

import { BaseButton } from "../../shared/components";
import { useIndexVaultModalState, useSwapRouterState } from "../hooks";
import { useViewportHeight } from "../../shared/hooks";

import {
  Container,
  ContentContainer,
  SwapTitle,
  RatioTitleContainer,
  RatioTitle,
  ToTitle,
} from "./SuccessTransactionSection.styles";

export const SuccessTransactionSection = () => {
  const [, setIndexVaultModalState] = useIndexVaultModalState();
  const { sourceValue, targetValue, sourceData, targetData } =
    useSwapRouterState();

  const containerHeight = useViewportHeight(0.85);

  const handleCloseButtonClick = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setIndexVaultModalState]);

  const { symbol: sourceSymbol = "" } = sourceData ?? {};
  const { symbol: targetSymbol = "" } = targetData ?? {};

  return (
    <Container height={containerHeight}>
      <ContentContainer>
        <SwapTitle>Swap Successful</SwapTitle>
        <RatioTitleContainer>
          <RatioTitle>{`${sourceValue} ${sourceSymbol}`}</RatioTitle>
          <ToTitle>to</ToTitle>
          <RatioTitle>{`${targetValue} ${targetSymbol}`}</RatioTitle>
        </RatioTitleContainer>
      </ContentContainer>
      <BaseButton onClick={handleCloseButtonClick} primaryColor="#5D5D5D">
        Close
      </BaseButton>
    </Container>
  );
};
