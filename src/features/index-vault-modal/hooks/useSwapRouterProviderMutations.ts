import { useMutation } from "react-query";
import { useCallback, useState } from "react";
import { BigNumber, constants } from "ethers";

import type { MutationError, SwapRouterMutations } from "../types";
import { InputType, MutationType } from "../types";
import {
  getSwapTransactionParameters,
  getTransactionOptions,
} from "../helpers";
import {
  delay,
  processWalletError,
  processTransactionError,
} from "../../shared/helpers";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  RouterV2Abi__factory as RouterV2AbiFactory,
  DirectWithdrawAbi__factory as DirectWithdrawAbiFactory,
  DirectDepositorAbi__factory as DirectDepositorAbiFactory,
} from "../../contracts/types";
import { ModalContentType } from "../types/modalContentType";

import { useSwapRouterConfig } from "./useSwapRouterConfig";
import { useSwapRouterState } from "./useSwapRouterState";
import { useResetMutationError } from "./useResetMutationError";
import { useIndexVaultModalState } from "./useIndexVaultModalState";

export const useSwapRouterProviderMutations = (): SwapRouterMutations => {
  const {
    routerAddress,
    directDepositorAddress,
    directWithdrawalAddress,
    walletProvider,
    contentType,
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
    slippageToleranceValue,
    tokensQueries,
  } = useSwapRouterState();

  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();

  const [swapMutationHash, setSwapMutationHash] = useState<string>();

  const runApproveAllowanceMutation = useCallback(async () => {
    if (!sourceData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const sourceTokenContract = Erc20AbiFactory.connect(
      sourceData.tokenAddress,
      signer
    );

    let spenderAddress = isUseDirectMode
      ? directDepositorAddress
      : routerAddress;

    if (contentType === ModalContentType.withdraw) {
      spenderAddress = directWithdrawalAddress;
    }

    const approveParameters = [spenderAddress, constants.MaxUint256] as const;

    const transactionOptions = await getTransactionOptions(signer);

    let transaction = null;

    try {
      await sourceTokenContract.callStatic.approve(
        ...approveParameters,
        transactionOptions
      );

      transaction = await sourceTokenContract.approve(
        ...approveParameters,
        transactionOptions
      );
    } catch (walletError) {
      processWalletError(walletError);
    }

    if (transaction) {
      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }

    return true;
  }, [
    contentType,
    sourceData,
    walletProvider,
    isUseDirectMode,
    directDepositorAddress,
    directWithdrawalAddress,
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

      const directWithdrawContract = DirectWithdrawAbiFactory.connect(
        directWithdrawalAddress,
        signer
      );

      const { amountIn, amountOut, path, to, deadline } =
        await getSwapTransactionParameters(
          mutationType,
          sourceValue,
          targetValue,
          sourceData,
          targetData,
          slippageToleranceValue,
          signer
        );

      const routerAmountParameters = {
        // tokens for tokens
        [MutationType.swapExactTokensForTokens]: [amountIn, amountOut] as const,
        [MutationType.swapTokensForExactTokens]: [amountOut, amountIn] as const,

        // tokens for native
        [MutationType.swapExactTokensForETH]: [amountIn, amountOut] as const,
        [MutationType.swapTokensForExactETH]: [amountOut, amountIn] as const,
      };

      const routerNativeAmountParameters = {
        // native for tokens (needs to add msg.value)
        [MutationType.swapExactETHForTokens]: [amountOut] as const,
        [MutationType.swapETHForExactTokens]: [amountOut] as const,
      };

      const routerDefaultParameters = [path, to, deadline] as const;

      const directDepositorAmountParameters = {
        // direct deposit tokens
        [MutationType.deposit]: [indexVaultAddress, amountIn] as const,
      };

      const directWithdrawalAmountParameters = {
        // direct withdrawal tokens
        [MutationType.directWithdraw]: [
          sourceData.tokenAddress,
          amountIn,
        ] as const,
      };

      const directWithdrawalClaimParameters = {
        // direct withdrawal tokens
        [MutationType.withdrawClaim]: [
          BigNumber.from(indexVaultModalState.withdrawId ?? 1),
        ] as const,
      };

      const directDepositorNativeAmountParameters = {
        // direct deposit native
        [MutationType.depositNative]: [indexVaultAddress] as const,
      };

      const transactionOptions = await getTransactionOptions(
        signer,
        mutationType,
        amountIn
      );

      let transaction = null;

      try {
        switch (mutationType) {
          case MutationType.swapExactTokensForTokens:
          case MutationType.swapTokensForExactTokens:
          case MutationType.swapExactTokensForETH:
          case MutationType.swapTokensForExactETH:
            await routerContract.callStatic[mutationType](
              ...routerAmountParameters[mutationType],
              ...routerDefaultParameters,
              transactionOptions
            );

            transaction = await routerContract[mutationType](
              ...routerAmountParameters[mutationType],
              ...routerDefaultParameters,
              transactionOptions
            );

            break;

          case MutationType.swapExactETHForTokens:
          case MutationType.swapETHForExactTokens:
            await routerContract.callStatic[mutationType](
              ...routerNativeAmountParameters[mutationType],
              ...routerDefaultParameters,
              transactionOptions
            );

            transaction = await routerContract[mutationType](
              ...routerNativeAmountParameters[mutationType],
              ...routerDefaultParameters,
              transactionOptions
            );

            break;

          case MutationType.directWithdraw: {
            await directWithdrawContract.callStatic[mutationType](
              ...directWithdrawalAmountParameters[mutationType],
              transactionOptions
            );

            transaction = await directWithdrawContract[mutationType](
              ...directWithdrawalAmountParameters[mutationType],
              transactionOptions
            );

            await transaction.wait();

            const lastWithdrawalIndex =
              await directWithdrawContract.getUserWithdrawsLength(
                await signer.getAddress()
              );

            setIndexVaultModalState((previousState) => ({
              ...previousState,
              contentType: ModalContentType.withdrawClaim,
              withdrawId: lastWithdrawalIndex.toNumber() - 1,
            }));

            break;
          }

          case MutationType.withdrawClaim:
            await directWithdrawContract.callStatic[mutationType](
              ...directWithdrawalClaimParameters[mutationType],
              transactionOptions
            );

            transaction = await directWithdrawContract[mutationType](
              ...directWithdrawalClaimParameters[mutationType],
              transactionOptions
            );

            break;

          case MutationType.deposit:
            await directDepositorContract.callStatic[mutationType](
              ...directDepositorAmountParameters[mutationType],
              transactionOptions
            );

            transaction = await directDepositorContract[mutationType](
              ...directDepositorAmountParameters[mutationType],
              transactionOptions
            );

            break;

          case MutationType.depositNative:
            await directDepositorContract.callStatic[mutationType](
              ...directDepositorNativeAmountParameters[mutationType],
              transactionOptions
            );

            transaction = await directDepositorContract[mutationType](
              ...directDepositorNativeAmountParameters[mutationType],
              transactionOptions
            );

            break;

          default:
            break;
        }
      } catch (walletError) {
        processWalletError(walletError);
      }

      if (transaction) {
        setSwapMutationHash(transaction.hash);

        try {
          await transaction.wait();
        } catch (transactionError) {
          processTransactionError(transactionError);
        }
      }

      return true;
    },
    [
      sourceData,
      targetData,
      walletProvider,
      routerAddress,
      directDepositorAddress,
      directWithdrawalAddress,
      sourceValue,
      targetValue,
      slippageToleranceValue,
      indexVaultAddress,
      setIndexVaultModalState,
      indexVaultModalState.withdrawId,
    ]
  );

  const handleMutationSuccess = useCallback(async () => {
    const { sourceTokenQuery, targetTokenQuery, nativeTokenQuery } =
      tokensQueries;

    await delay(3000);

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

  useResetMutationError(approveAllowanceMutation);
  useResetMutationError(swapMutation);

  return {
    approveAllowanceMutation,
    swapMutation,
    swapMutationHash,

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

    runDirectWithdraw: () => {
      const { mutate } = swapMutation;

      mutate(MutationType.directWithdraw);
    },

    runClaim: () => {
      const { mutate } = swapMutation;

      mutate(MutationType.withdrawClaim);
    },
  };
};
