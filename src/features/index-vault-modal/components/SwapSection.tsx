import { IconContainer } from "../../shared/components";
import { Flip } from "../icons";
import { useSwapRouterState } from "../hooks";

import { SwapInputCard } from "./SwapInputCard";
import { VaultInfo } from "./VaultInfo";
import { SwapButton } from "./SwapButton";
import {
  Container,
  SwapInputsContainer,
  FlipButton,
  FlipButtonContainer,
} from "./SwapSection.styles";
import { CardWarning } from "./CardWarning";

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

    isDirectModeBetterThanSwapMode,
    isUseDirectMode,

    sourcePrice,
    targetPrice,
    priceImpactRate,

    remainderValue,
    vaultChainId,

    isFlipped,
    swapInputs,
  } = useSwapRouterState();

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
          remainderValue={remainderValue}
          sourceTokenData={sourceData}
          tokenData={sourceData}
        />
        <FlipButtonContainer>
          <FlipButton isFlipped={isFlipped} onClick={swapInputs}>
            <IconContainer height={14} width={14}>
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
          sourceTokenData={sourceData}
          tokenData={targetData}
          vaultChainId={vaultChainId}
        />
      </SwapInputsContainer>
      <VaultInfo
        isSourceTokenDataLoading={isSourceTokenDataLoading}
        isTargetTokenDataLoading={isTargetTokenDataLoading}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
      />
      <CardWarning
        inputValue={sourceValue}
        isFlipped={isFlipped}
        isSource
        isUseNativeData={isUseNativeSourceData}
        nativeData={nativeData}
        remainderValue={remainderValue}
        sourceTokenData={sourceData}
        tokenData={sourceData}
      />
      <CardWarning
        inputValue={targetValue}
        isDirectModeBetterThanSwapMode={isDirectModeBetterThanSwapMode}
        isFlipped={isFlipped}
        isUseDirectMode={isUseDirectMode}
        isUseNativeData={isUseNativeTargetData}
        nativeData={nativeData}
        sourceTokenData={sourceData}
        tokenData={targetData}
        vaultChainId={vaultChainId}
      />
      <SwapButton
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={isTargetValueLoading}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
      />
    </Container>
  );
};
