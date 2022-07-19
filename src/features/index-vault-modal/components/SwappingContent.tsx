import {
  useSwapRouterConfig,
  useSwapRouterMutations,
  useSwapRouterState,
} from "../hooks";
import { PendingMutationContent } from "../../modal/components/PendingMutationContent";

export const SwappingContent = () => {
  const { chainId } = useSwapRouterConfig();
  const { sourceValue, targetValue, sourceData, targetData } =
    useSwapRouterState();
  const { swapMutation, swapMutationHash = "" } = useSwapRouterMutations();

  const isSwapSucceed = Boolean(swapMutation?.data);

  const sourceTokenData = {
    value: sourceValue,
    symbol: sourceData?.symbol ?? "",
  };

  const targetTokenData = {
    value: targetValue,
    symbol: targetData?.symbol ?? "",
  };

  return (
    <PendingMutationContent
      chainId={chainId}
      isMutationSucceed={isSwapSucceed}
      mutationHash={swapMutationHash}
      pendingTitle="Swapping..."
      sourceTokenData={sourceTokenData}
      successTitle="Swap Successful"
      targetTokenData={targetTokenData}
    />
  );
};
