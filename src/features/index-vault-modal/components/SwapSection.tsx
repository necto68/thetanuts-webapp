import { useCallback, useState } from "react";

import { IconContainer } from "../../shared/components";
import { Flip } from "../icons";
import { useSwapRouter, useSwapRouterMutations } from "../hooks";

import { SwapInputCard } from "./SwapInputCard";
import { VaultInfo } from "./VaultInfo";
import { SwapButton } from "./SwapButton";
import {
  Container,
  SwapInputsContainer,
  FlipButton,
  FlipButtonContainer,
} from "./SwapSection.styles";

export const SwapSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const {
    sourceValue,
    targetValue,

    setSourceValue,
    setTargetValue,

    isSourceValueLoading,
    isTargetValueLoading,

    sourceData,
    targetData,
    nativeData,

    isSourceDataLoading,
    isTargetDataLoading,
    isNativeDataLoading,

    setUseSourceNativeData,
    setUseTargetNativeData,

    isUseNativeSourceData,
    isUseNativeTargetData,

    lastUpdatedInputType,

    swapInputs,

    tokensQueries,
  } = useSwapRouter();

  const { rootMutation, routerMutations } = useSwapRouterMutations(
    sourceValue,
    targetValue,

    sourceData,
    targetData,

    isUseNativeSourceData,
    isUseNativeTargetData,

    lastUpdatedInputType,

    tokensQueries
  );

  const handleFlipButtonClick = useCallback(() => {
    setIsFlipped((previousIsFlipped) => !previousIsFlipped);
    swapInputs();
  }, [swapInputs]);

  const sourceTokenData = isUseNativeSourceData ? nativeData : sourceData;
  const targetTokenData = isUseNativeTargetData ? nativeData : targetData;

  const isSourceTokenDataLoading = isSourceDataLoading || isNativeDataLoading;
  const isTargetTokenDataLoading = isTargetDataLoading || isNativeDataLoading;

  return (
    <Container>
      <SwapInputsContainer>
        <SwapInputCard
          inputValue={sourceValue}
          isFlipped={isFlipped}
          isNativeDataLoading={isNativeDataLoading}
          isSource
          isTokenDataLoading={isSourceDataLoading}
          isUseNativeData={isUseNativeSourceData}
          isValueLoading={isSourceValueLoading}
          nativeData={nativeData}
          onInputChange={setSourceValue}
          onUseNativeDataChange={setUseSourceNativeData}
          tokenData={sourceData}
        />
        <FlipButtonContainer>
          <FlipButton isFlipped={isFlipped} onClick={handleFlipButtonClick}>
            <IconContainer height={20} width={20}>
              <Flip />
            </IconContainer>
          </FlipButton>
        </FlipButtonContainer>
        <SwapInputCard
          inputValue={targetValue}
          isFlipped={isFlipped}
          isNativeDataLoading={isNativeDataLoading}
          isTokenDataLoading={isTargetDataLoading}
          isUseNativeData={isUseNativeTargetData}
          isValueLoading={isTargetValueLoading}
          nativeData={nativeData}
          onInputChange={setTargetValue}
          onUseNativeDataChange={setUseTargetNativeData}
          tokenData={targetData}
        />
      </SwapInputsContainer>
      <VaultInfo
        isSourceTokenDataLoading={isSourceTokenDataLoading}
        isSourceValueLoading={isSourceValueLoading}
        isTargetTokenDataLoading={isTargetTokenDataLoading}
        isTargetValueLoading={isTargetValueLoading}
        sourceTokenData={sourceTokenData}
        sourceValue={sourceValue}
        targetTokenData={targetTokenData}
        targetValue={targetValue}
      />
      <SwapButton 
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={isTargetValueLoading}
        rootMutation={rootMutation}
        routerMutations={routerMutations}
        sourceTokenData={sourceTokenData}
        sourceValue={sourceValue}
        targetTokenData={targetTokenData}
        targetValue={targetValue}
      />
    </Container>
  );
};
