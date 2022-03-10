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

    isDirectModeBetterThanSwapMode,
    isUseDirectMode,

    sourcePrice,
    targetPrice,
    priceImpactRate,

    isFlipped,
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

    isUseDirectMode,

    lastUpdatedInputType,

    tokensQueries
  );

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
          priceValue={sourcePrice}
          tokenData={sourceData}
        />
        <FlipButtonContainer>
          <FlipButton isFlipped={isFlipped} onClick={swapInputs}>
            <IconContainer height={20} width={20}>
              <Flip />
            </IconContainer>
          </FlipButton>
        </FlipButtonContainer>
        <SwapInputCard
          inputValue={targetValue}
          isDirectModeBetterThanSwapMode={isDirectModeBetterThanSwapMode}
          isFlipped={isFlipped}
          isNativeDataLoading={isNativeDataLoading}
          isTokenDataLoading={isTargetDataLoading}
          isUseDirectMode={isUseDirectMode}
          isUseNativeData={isUseNativeTargetData}
          isValueLoading={isTargetValueLoading}
          nativeData={nativeData}
          onInputChange={setTargetValue}
          onUseNativeDataChange={setUseTargetNativeData}
          priceImpactRate={priceImpactRate}
          priceValue={targetPrice}
          tokenData={targetData}
        />
      </SwapInputsContainer>
      <VaultInfo
        isFlipped={isFlipped}
        isSourceTokenDataLoading={isSourceTokenDataLoading}
        isSourceValueLoading={isSourceValueLoading}
        isTargetTokenDataLoading={isTargetTokenDataLoading}
        isTargetValueLoading={isTargetValueLoading}
        isUseDirectMode={isUseDirectMode}
        sourceTokenData={sourceTokenData}
        sourceValue={sourceValue}
        targetTokenData={targetTokenData}
        targetValue={targetValue}
      />
      <SwapButton 
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={isTargetValueLoading}
        isUseDirectMode={isUseDirectMode}
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
