import { useMutation } from "react-query";
import { useCallback } from "react";
import { constants } from "ethers";

import type { Token } from "../types";
import { InputType, MutationType } from "../types";
import { getSwapTransactionParameters } from "../helpers";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  RouterV2Abi__factory as RouterV2AbiFactory,
  DirectDepositorAbi__factory as DirectDepositorAbiFactory,
} from "../../contracts/types";

import { useSwapRouterConfig } from "./useSwapRouterConfig";
import type { useSwapRouter } from "./useSwapRouter";

export const useSwapRouterMutations = (
  sourceValue: string,
  targetValue: string,
  sourceData: Token | undefined,
  targetData: Token | undefined,
  isUseNativeSourceData: boolean,
  isUseNativeTargetData: boolean,
  isUseDirectMode: boolean,
  lastUpdatedInputType: InputType,
  tokensQueries: ReturnType<typeof useSwapRouter>["tokensQueries"]
) => {
  const {
    routerAddress,
    directDepositorAddress,
    walletProvider,
    indexVaultAddress,
    indexVaultQuery,
  } = useSwapRouterConfig();

  const runMutation = useCallback(
    // eslint-disable-next-line complexity
    async (mutationType: MutationType) => {
      if (!sourceData || !targetData || !walletProvider) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const sourceTokenContract = Erc20AbiFactory.connect(
        sourceData.tokenAddress,
        signer
      );

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

      const spenderAddress = isUseDirectMode
        ? directDepositorAddress
        : routerAddress;

      const approveParameters = [spenderAddress, constants.MaxUint256] as const;

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
        case MutationType.approveAllowance:
          await sourceTokenContract.callStatic.approve(...approveParameters);

          transaction = await sourceTokenContract.approve(...approveParameters);

          break;

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
      isUseDirectMode,
    ]
  );

  const handleMutationSuccess = useCallback(async () => {
    const { sourceTokenQuery, targetTokenQuery, nativeTokenQuery } =
      tokensQueries;

    await Promise.all([
      sourceTokenQuery.refetch(),
      targetTokenQuery.refetch(),
      nativeTokenQuery.refetch(),
      indexVaultQuery.refetch(),
    ]);
  }, [indexVaultQuery, tokensQueries]);

  const rootMutation = useMutation<
    boolean,
    { message: string; data?: { code: number; message: string } },
    MutationType
  >(async (mutationType: MutationType) => await runMutation(mutationType), {
    onSuccess: handleMutationSuccess,
  });

  const { mutate } = rootMutation;

  return {
    rootMutation,

    routerMutations: {
      runApproveAllowance: () => {
        mutate(MutationType.approveAllowance);
      },

      runSwapTokensForTokens: () => {
        // now lastUpdatedInputType === InputType.source

        if (
          lastUpdatedInputType === InputType.source &&
          isUseNativeSourceData
        ) {
          mutate(MutationType.swapExactETHForTokens);
          return;
        }

        if (
          lastUpdatedInputType === InputType.source &&
          isUseNativeTargetData
        ) {
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
        if (isUseNativeSourceData) {
          mutate(MutationType.depositNative);
          return;
        }

        mutate(MutationType.deposit);
      },
    },
  };
};
