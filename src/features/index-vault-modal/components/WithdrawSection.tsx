import { useSwapRouterState } from "../hooks";

import { SwapInputCard } from "./SwapInputCard";
import { SwapButton } from "./SwapButton";
import { Container, SwapInputsContainer } from "./SwapSection.styles";
import { VaultWithdrawInfo } from "./VaultWithdrawInfo";

export const WithdrawSection = () => {
  const {
    sourceValue,

    setSourceValue,

    isSourceValueLoading,

    sourceData,
    targetData,
    nativeData,

    isSourceDataLoading,
    isNativeDataLoading,

    setUseSourceNativeData,

    isUseNativeSourceData,
    isUseNativeTargetData,

    sourcePrice,

    isFlipped,
  } = useSwapRouterState();

  const sourceTokenData = isUseNativeSourceData ? nativeData : sourceData;
  const targetTokenData = isUseNativeTargetData ? nativeData : targetData;

  return (
    <Container>
      <SwapInputsContainer>
        <SwapInputCard
          fieldWarning="Warning: You cannot undo this step"
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
      </SwapInputsContainer>
      <VaultWithdrawInfo targetTokenData={targetTokenData} />
      <SwapButton
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={false}
        sourceTokenData={sourceTokenData}
        targetTokenData={sourceTokenData}
      />
    </Container>
  );
};
