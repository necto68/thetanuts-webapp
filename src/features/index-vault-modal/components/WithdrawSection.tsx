import { useSwapRouterState } from "../hooks";
import { ModalContentType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

import { SwapInputCard } from "./SwapInputCard";
import { SwapButton } from "./SwapButton";
import { Container, SwapInputsContainer } from "./SwapSection.styles";
import { VaultWithdrawInfo } from "./VaultWithdrawInfo";
import { CardWarning } from "./CardWarning";

export const WithdrawSection = () => {
  const [{ contentType, vaultType }] = useVaultModalState();
  const {
    sourceValue,

    setSourceValue,

    isSourceValueLoading,
    isDirectModeBetterThanSwapMode,

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
  } = useSwapRouterState();

  const sourceTokenData = isUseNativeSourceData ? nativeData : sourceData;
  const targetTokenData = isUseNativeTargetData ? nativeData : targetData;

  const isSourceTokenDataLoading = isSourceDataLoading || isNativeDataLoading;
  const isTargetTokenDataLoading = isTargetDataLoading || isNativeDataLoading;

  return (
    <Container>
      <SwapInputsContainer>
        <SwapInputCard
          disabled={contentType === ModalContentType.withdrawSummary}
          inputValue={sourceValue}
          isDirectModeBetterThanSwapMode={isDirectModeBetterThanSwapMode}
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
      <VaultWithdrawInfo
        isSourceTokenDataLoading={isSourceTokenDataLoading}
        isTargetTokenDataLoading={isTargetTokenDataLoading}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
      />
      <CardWarning
        disabled={contentType === ModalContentType.withdrawSummary}
        fieldWarning="Warning: You cannot undo this step"
        inputValue={sourceValue}
        isDirectModeBetterThanSwapMode={isDirectModeBetterThanSwapMode}
        isFlipped={isFlipped}
        isSource
        isUseNativeData={isUseNativeSourceData}
        nativeData={nativeData}
        tokenData={sourceData}
        vaultType={vaultType}
      />
      <SwapButton
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={false}
        sourceTokenData={sourceTokenData}
        targetTokenData={sourceTokenData}
      />
    </Container>
  );
};
