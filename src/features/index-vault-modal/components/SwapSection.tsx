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

    // TODO: will use for target SwapInputCard
    // isDirectDepositBetterThanSwap,
    isUseDirectDepositMode,

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

    isUseDirectDepositMode,

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
        isUseDirectDepositMode={isUseDirectDepositMode}
        sourceTokenData={sourceTokenData}
        sourceValue={sourceValue}
        targetTokenData={targetTokenData}
        targetValue={targetValue}
      />
      <SwapButton
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={isTargetValueLoading}
        isUseDirectDepositMode={isUseDirectDepositMode}
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
