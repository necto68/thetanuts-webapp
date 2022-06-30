import { useSwapRouterState } from "../hooks";

import { Container } from "./SwapContent.styles";
import { SwapButton } from "./SwapButton";
import { VaultWithdrawSummaryInfo } from "./VaultWithdrawSummaryInfo";

export const WithdrawSummary = () => {
  const {
    isSourceValueLoading,
    sourceData,
    nativeData,
    isUseNativeSourceData,
  } = useSwapRouterState();

  const sourceTokenData = isUseNativeSourceData ? nativeData : sourceData;

  return (
    <Container>
      <VaultWithdrawSummaryInfo />
      <SwapButton
        isSourceValueLoading={isSourceValueLoading}
        isTargetValueLoading={false}
        sourceTokenData={sourceTokenData}
        targetTokenData={sourceTokenData}
      />
    </Container>
  );
};
