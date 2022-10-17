import { useEffect } from "react";

import { useSwapRouterState, useWithdrawDataQuery } from "../hooks";

import { SwapInputCard } from "./SwapInputCard";
import { SwapButton } from "./SwapButton";
import { Container, SwapInputsContainer } from "./SwapSection.styles";
import { VaultWithdrawInfo } from "./VaultWithdrawInfo";

export const WithdrawClaimSection = () => {
  const {
    sourceValue,
    setSourceValue,

    isSourceValueLoading,

    sourceData,
    targetData,
    nativeData,

    isSourceDataLoading,
    isNativeDataLoading,
    isTargetDataLoading,

    setUseSourceNativeData,

    isUseNativeSourceData,
    isUseNativeTargetData,
    sourcePrice,

    isFlipped,
    swapInputs,
  } = useSwapRouterState();

  const withdrawDataQuery = useWithdrawDataQuery();
  const { indexTokenWithdrawn } = withdrawDataQuery.data ?? {};
  const { isLoading } = withdrawDataQuery;

  useEffect(() => {
    if (!isFlipped) {
      swapInputs();
    }
    if (indexTokenWithdrawn) {
      setSourceValue(indexTokenWithdrawn);
    }
  }, [setSourceValue, indexTokenWithdrawn, isFlipped, swapInputs]);

  const sourceTokenData = isUseNativeSourceData ? nativeData : sourceData;
  const targetTokenData = isUseNativeTargetData ? nativeData : targetData;

  const isSourceTokenDataLoading = isSourceDataLoading || isNativeDataLoading;
  const isTargetTokenDataLoading = isTargetDataLoading || isNativeDataLoading;

  return (
    <Container>
      <SwapInputsContainer>
        <SwapInputCard
          disabled
          inputValue={sourceValue}
          isFlipped={false}
          isNativeDataLoading={isNativeDataLoading}
          isSource
          isTokenDataLoading={isSourceDataLoading}
          isUseNativeData={isUseNativeSourceData}
          isValueLoading={isLoading}
          nativeData={nativeData}
          onInputChange={setSourceValue}
          onUseNativeDataChange={setUseSourceNativeData}
          priceValue={sourcePrice}
          tokenData={sourceData}
        />
      </SwapInputsContainer>
      <VaultWithdrawInfo
        isSourceTokenDataLoading={isSourceTokenDataLoading}
        isTargetTokenDataLoading={isTargetTokenDataLoading}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
      />
      <SwapButton
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={false}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
      />
    </Container>
  );
};
