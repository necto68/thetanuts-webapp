import { useEffect } from "react";

import { useSwapRouterState } from "../hooks";
import { useWithdrawDataQuery } from "../hooks/useWithdrawDataQuery";

import { SwapInputCard } from "./SwapInputCard";
import { SwapButton } from "./SwapButton";
import { Container, SwapInputsContainer } from "./SwapSection.styles";
import { VaultWithdrawInfo } from "./VaultWithdrawInfo";

export const WithdrawClaimSection = () => {
  const {
    targetValue,

    setTargetValue,

    isSourceValueLoading,

    sourceData,
    targetData,
    nativeData,

    isSourceDataLoading,
    isNativeDataLoading,

    setUseSourceNativeData,

    isUseNativeSourceData,
    isUseNativeTargetData,

    targetPrice,

    isFlipped,
    swapInputs,
  } = useSwapRouterState();

  const { data: withdrawData } = useWithdrawDataQuery();
  const { claimableBalance } = withdrawData ?? {};

  useEffect(() => {
    if (!isFlipped) {
      swapInputs();
    }
  }, [isFlipped, swapInputs]);

  useEffect(() => {
    setTargetValue(claimableBalance ?? "0");
  }, [claimableBalance, setTargetValue]);

  const sourceTokenData = isUseNativeSourceData ? nativeData : sourceData;
  const targetTokenData = isUseNativeTargetData ? nativeData : targetData;

  return (
    <Container>
      <SwapInputsContainer>
        <SwapInputCard
          disabled
          inputValue={targetValue}
          isFlipped={false}
          isNativeDataLoading={isNativeDataLoading}
          isSource={false}
          isTokenDataLoading={isSourceDataLoading}
          isUseNativeData={isUseNativeSourceData}
          isValueLoading={isSourceValueLoading}
          nativeData={nativeData}
          onInputChange={setTargetValue}
          onUseNativeDataChange={setUseSourceNativeData}
          priceValue={targetPrice}
          tokenData={targetData}
        />
      </SwapInputsContainer>
      <VaultWithdrawInfo targetTokenData={targetTokenData} />
      <SwapButton
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={false}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
      />
    </Container>
  );
};
