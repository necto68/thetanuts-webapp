import { useMutation } from "react-query";
import { useCallback } from "react";
import { constants } from "ethers";

import type { MutationError, SwapRouterMutations } from "../types";
import { InputType, MutationType } from "../types";
import { getSwapTransactionParameters } from "../helpers";
import { delay } from "../../shared/helpers";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  RouterV2Abi__factory as RouterV2AbiFactory,
  DirectDepositorAbi__factory as DirectDepositorAbiFactory,
} from "../../contracts/types";

import { useSwapRouterConfig } from "./useSwapRouterConfig";
import { useSwapRouterState } from "./useSwapRouterState";

export const useSwapRouterProviderMutations = (): SwapRouterMutations => {
  const {
    routerAddress,
    directDepositorAddress,
    walletProvider,
    indexVaultAddress,
    indexVaultQuery,
  } = useSwapRouterConfig();

  const {
    sourceValue,
    targetValue,
    sourceData,
    targetData,
    isUseNativeSourceData,
    isUseNativeTargetData,
    isUseDirectMode,
    lastUpdatedInputType,
    tokensQueries,
  } = useSwapRouterState();

  const runApproveAllowanceMutation = useCallback(async () => {
    if (!sourceData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const sourceTokenContract = Erc20AbiFactory.connect(
      sourceData.tokenAddress,
      signer
    );

    const spenderAddress = isUseDirectMode
      ? directDepositorAddress
      : routerAddress;

    const approveParameters = [spenderAddress, constants.MaxUint256] as const;

    await sourceTokenContract.callStatic.approve(...approveParameters);
    const transaction = await sourceTokenContract.approve(...approveParameters);

    await transaction.wait();

    return true;
  }, [
    sourceData,
    walletProvider,
    isUseDirectMode,
    directDepositorAddress,
    routerAddress,
  ]);

  const runSwapMutation = useCallback(
    // eslint-disable-next-line complexity
    async (mutationType: MutationType) => {
      if (!sourceData || !targetData || !walletProvider) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const routerContract = RouterV2AbiFactory.connect(routerAddress, signer);

      const directDepositorContract = DirectDepositorAbiFactory.connect(
        directDepositorAddress,
        signer
      );

      const { amountIn, amountOut, path, to, deadline } =
        await getSwapTransactionParameters(
          sourceValue,
          targetValue,
          sourceData,
          targetData,
          signer
        );

      const routerAmountParameters = {
        // tokens for tokens
        [MutationType.swapExactTokensForTokens]: [amountIn, amountOut] as const,
        [MutationType.swapTokensForExactTokens]: [amountOut, amountIn] as const,

        // tokens for native
        [MutationType.swapExactTokensForETH]: [amountIn, amountOut] as const,
        [MutationType.swapTokensForExactETH]: [amountOut, amountIn] as const,

        // native for tokens (needs to add msg.value)
        [MutationType.swapExactETHForTokens]: [amountOut] as const,
        [MutationType.swapETHForExactTokens]: [amountOut] as const,
      };

      const routerDefaultParameters = [path, to, deadline] as const;

      const directDepositorAmountParameters = {
        // direct deposit tokens
        [MutationType.deposit]: [indexVaultAddress, amountIn] as const,

        // direct deposit native
        [MutationType.depositNative]: [indexVaultAddress] as const,
      };

      let transaction = null;

      switch (mutationType) {
        case MutationType.swapExactTokensForTokens:
        case MutationType.swapTokensForExactTokens:
        case MutationType.swapExactTokensForETH:
        case MutationType.swapTokensForExactETH:
          await routerContract.callStatic[mutationType](
            ...routerAmountParameters[mutationType],
            ...routerDefaultParameters
          );

          transaction = await routerContract[mutationType](
            ...routerAmountParameters[mutationType],
            ...routerDefaultParameters
          );

          break;

        case MutationType.swapExactETHForTokens:
        case MutationType.swapETHForExactTokens:
          await routerContract.callStatic[mutationType](
            ...routerAmountParameters[mutationType],
            ...routerDefaultParameters,
            { value: amountIn }
          );

          transaction = await routerContract[mutationType](
            ...routerAmountParameters[mutationType],
            ...routerDefaultParameters,
            { value: amountIn }
          );

          break;

        case MutationType.deposit:
          await directDepositorContract.callStatic[mutationType](
            ...directDepositorAmountParameters[mutationType]
          );

          transaction = await directDepositorContract[mutationType](
            ...directDepositorAmountParameters[mutationType]
          );

          break;

        case MutationType.depositNative:
          await directDepositorContract.callStatic[mutationType](
            ...directDepositorAmountParameters[mutationType],
            { value: amountIn }
          );

          transaction = await directDepositorContract[mutationType](
            ...directDepositorAmountParameters[mutationType],
            { value: amountIn }
          );

          break;

        default:
          break;
      }

      if (transaction) {
        await transaction.wait();
      }

      return true;
    },
    [
      sourceData,
      targetData,
      walletProvider,
      routerAddress,
      directDepositorAddress,
      sourceValue,
      targetValue,
      indexVaultAddress,
    ]
  );

  const handleMutationSuccess = useCallback(async () => {
    const { sourceTokenQuery, targetTokenQuery, nativeTokenQuery } =
      tokensQueries;

    await delay(5000);

    await Promise.all([
      sourceTokenQuery ? sourceTokenQuery.refetch() : null,
      targetTokenQuery ? targetTokenQuery.refetch() : null,
      nativeTokenQuery ? nativeTokenQuery.refetch() : null,
      indexVaultQuery.refetch(),
    ]);
  }, [indexVaultQuery, tokensQueries]);

  const approveAllowanceMutation = useMutation<boolean, MutationError>(
    async () => await runApproveAllowanceMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const swapMutation = useMutation<boolean, MutationError, MutationType>(
    async (mutationType: MutationType) => await runSwapMutation(mutationType),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  return {
    approveAllowanceMutation,
    swapMutation,

    runApproveAllowance: () => {
      approveAllowanceMutation.mutate();
    },

    runSwapTokensForTokens: () => {
      const { mutate } = swapMutation;

      // now lastUpdatedInputType === InputType.source

      if (lastUpdatedInputType === InputType.source && isUseNativeSourceData) {
        mutate(MutationType.swapExactETHForTokens);
        return;
      }

      if (lastUpdatedInputType === InputType.source && isUseNativeTargetData) {
        mutate(MutationType.swapExactTokensForETH);
        return;
      }

      if (lastUpdatedInputType === InputType.source) {
        mutate(MutationType.swapExactTokensForTokens);
        return;
      }

      // now lastUpdatedInputType === InputType.target

      if (isUseNativeSourceData) {
        mutate(MutationType.swapETHForExactTokens);
        return;
      }

      if (isUseNativeTargetData) {
        mutate(MutationType.swapTokensForExactETH);
        return;
      }

      mutate(MutationType.swapTokensForExactTokens);
    },

    runDirectDeposit: () => {
      const { mutate } = swapMutation;

      if (isUseNativeSourceData) {
        mutate(MutationType.depositNative);
        return;
      }

      mutate(MutationType.deposit);
    },
  };
};
