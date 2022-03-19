import { useCallback } from "react";

import { BaseButton } from "../../shared/components";
import { useSwapRouterMutations, useSwapRouterState } from "../hooks";
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
  const { sourceValue, targetValue, sourceData, targetData } =
    useSwapRouterState();
  const { swapMutation } = useSwapRouterMutations();

  const containerHeight = useViewportHeight(0.85);

  const handleCloseButtonClick = useCallback(() => {
    if (swapMutation) {
      swapMutation.reset();
    }
  }, [swapMutation]);

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
