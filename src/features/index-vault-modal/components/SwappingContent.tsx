import { useCallback, useMemo, useState } from "react";
import Lottie from "react-lottie-player";

import swapping from "../animations/swapping.json";
import wave from "../animations/wave.json";
import { useViewportHeight } from "../../shared/hooks";
import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useSwapRouterMutations,
  useSwapRouterState,
} from "../hooks";
import { getExplorerUrl } from "../../wallet/helpers";
import { PathType } from "../../wallet/types";

import {
  Container,
  BackgroundAnimationContainer,
  SwapInfoContainer,
  ContentContainer,
  SwapTitle,
  AnimationContainer,
  RatioTitleContainer,
  RatioTitle,
  ToTitle,
  TransactionLink,
  CloseButton,
} from "./SwappingContent.styles";

export const SwappingContent = () => {
  const [, setIndexVaultModalState] = useIndexVaultModalState();

  const { swapMutation, swapMutationHash = "" } = useSwapRouterMutations();
  const { sourceValue, targetValue, sourceData, targetData } =
    useSwapRouterState();
  const { chainId } = useSwapRouterConfig();

  // background animation
  const [isFirstLoopCompleted, setIsFirstLoopCompleted] = useState(false);

  const handleLoopComplete = useCallback(() => {
    if (!isFirstLoopCompleted) {
      setIsFirstLoopCompleted(true);
    }
  }, [isFirstLoopCompleted]);

  const backgroundAnimationSegments = useMemo<[number, number]>(
    () => (isFirstLoopCompleted ? [38, 80] : [0, 80]),
    [isFirstLoopCompleted]
  );

  // close button
  const handleCloseButtonClick = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setIndexVaultModalState]);

  const containerHeight = useViewportHeight(0.85);

  const { data: isSwapSuccessful = false } = swapMutation ?? {};

  const transactionUrl = getExplorerUrl(PathType.tx, chainId, swapMutationHash);

  const { symbol: sourceSymbol = "" } = sourceData ?? {};
  const { symbol: targetSymbol = "" } = targetData ?? {};

  return (
    <Container height={containerHeight}>
      {isSwapSuccessful ? (
        <BackgroundAnimationContainer>
          <Lottie
            animationData={wave}
            loop
            onLoopComplete={handleLoopComplete}
            play
            segments={backgroundAnimationSegments}
          />
        </BackgroundAnimationContainer>
      ) : null}
      <ContentContainer>
        <SwapInfoContainer>
          <AnimationContainer isShow={!isSwapSuccessful}>
            <Lottie animationData={swapping} loop play />
          </AnimationContainer>
          <SwapTitle>
            {isSwapSuccessful ? "Swap Successful" : "Swapping..."}
          </SwapTitle>
          <RatioTitleContainer>
            <RatioTitle>{`${sourceValue} ${sourceSymbol}`}</RatioTitle>
            <ToTitle>to</ToTitle>
            <RatioTitle>{`${targetValue} ${targetSymbol}`}</RatioTitle>
          </RatioTitleContainer>
          <TransactionLink
            href={transactionUrl}
            isSwapSuccessful={isSwapSuccessful}
            target="_blank"
          >
            View Transaction in Explorer
          </TransactionLink>
        </SwapInfoContainer>
        <CloseButton onClick={handleCloseButtonClick} primaryColor="#FFFFFF">
          Close
        </CloseButton>
      </ContentContainer>
    </Container>
  );
};
