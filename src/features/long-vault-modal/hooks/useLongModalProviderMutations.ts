import { useWallet } from "@gimmixorg/use-wallet";
import { useMutation } from "react-query";
import { useCallback, useState } from "react";
import { constants } from "ethers";
import Big from "big.js";

import type { LongModalMutations } from "../types";
import type { MutationError } from "../../index-vault-modal/types";
import { chainsMap } from "../../wallet/constants";
import {
  delay,
  processWalletError,
  processTransactionError,
} from "../../shared/helpers";
import { useResetMutationError } from "../../index-vault-modal/hooks/useResetMutationError";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import {
  LongVaultPositionManagerAbi__factory as LongVaultPositionManagerAbiFactory,
  DebtTokenAbi__factory as DebtTokenAbiFactory,
} from "../../contracts/types";
import { useLongOptionModalConfig } from "../../long-option-modal/hooks";
import { quoteExactOutputSingle } from "../helpers";

import { useLongModalConfig } from "./useLongModalConfig";

export const useLongModalProviderMutations = (): LongModalMutations => {
  const { account } = useWallet();

  const {
    walletProvider,
    basicVaultChainId,
    basicVaultAddress,
    spenderAddress,
    collateralTokenAddress,
  } = useBasicModalConfig();
  const { longVaultReaderQuery, collateralAssetQuery } = useLongModalConfig();
  const { longOptionReaderQuery } = useLongOptionModalConfig();

  const { inputValue, tokenData, tokensQueries } = useBasicModalState();

  const [mutationHash, setMutationHash] = useState<string>();

  const { data: collateralAssetData } = collateralAssetQuery;
  const { lendingPoolAddress = "" } = collateralAssetData ?? {};

  const runApproveDelegationMutation = useCallback(async () => {
    if (!walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const { data } = longVaultReaderQuery;
    const debtTokenAddress = data?.debtToken.tokenAddress ?? "";

    const debtTokenContract = DebtTokenAbiFactory.connect(
      debtTokenAddress,
      signer
    );

    const approveDelegationParameters = [
      spenderAddress,
      constants.MaxUint256,
    ] as const;

    let transaction = null;

    try {
      await debtTokenContract.callStatic.approveDelegation(
        ...approveDelegationParameters
      );

      transaction = await debtTokenContract.approveDelegation(
        ...approveDelegationParameters
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
  }, [walletProvider, longVaultReaderQuery, spenderAddress]);

  const runOpenPositionMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const longVaultPositionManagerContract =
      LongVaultPositionManagerAbiFactory.connect(spenderAddress, signer);

    const { loanToValue = 0, collateralPrice = 0 } = collateralAssetData ?? {};

    const { data } = longVaultReaderQuery;
    const { debtTokenPrice = 0 } = data ?? {};

    const depositAmount = new Big(inputValue)
      .mul(tokenData.tokenDivisor)
      .round();

    const availableForBorrow = depositAmount
      .mul(collateralPrice)
      .mul(loanToValue);

    const LPToBorrowAmount = availableForBorrow
      .div(1 - loanToValue)
      .div(debtTokenPrice)
      .round()
      .toString();

    const openPositionParameters = [
      collateralTokenAddress,
      depositAmount.toString(),
      lendingPoolAddress,
      basicVaultAddress,
      LPToBorrowAmount,
    ] as const;

    let transaction = null;

    try {
      await longVaultPositionManagerContract.callStatic.depositAndQueueOptionPosition(
        ...openPositionParameters
      );

      transaction =
        await longVaultPositionManagerContract.depositAndQueueOptionPosition(
          ...openPositionParameters
        );
    } catch (walletError) {
      processWalletError(walletError);
    }

    if (transaction) {
      setMutationHash(transaction.hash);

      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }

    return true;
  }, [
    basicVaultAddress,
    collateralAssetData,
    inputValue,
    longVaultReaderQuery,
    lendingPoolAddress,
    spenderAddress,
    tokenData,
    walletProvider,
    collateralTokenAddress,
  ]);

  const runOpenPositionImmediatelyMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const { data } = longOptionReaderQuery;
    const { LPToBorrowValue = new Big(0), minToReceiveLPValue = new Big(0) } =
      data ?? {};

    const longVaultPositionManagerContract =
      LongVaultPositionManagerAbiFactory.connect(spenderAddress, signer);

    const depositAmount = new Big(inputValue)
      .mul(tokenData.tokenDivisor)
      .round();

    const openPositionImmediatelyParameters = [
      collateralTokenAddress,
      depositAmount.toString(),
      lendingPoolAddress,
      basicVaultAddress,
      LPToBorrowValue.toString(),
      minToReceiveLPValue.mul(0.9995).round().toString(),
    ] as const;

    let transaction = null;

    try {
      await longVaultPositionManagerContract.callStatic.depositAndOpenBySwapOptionPosition(
        ...openPositionImmediatelyParameters
      );

      transaction =
        await longVaultPositionManagerContract.depositAndOpenBySwapOptionPosition(
          ...openPositionImmediatelyParameters
        );
    } catch (walletError) {
      processWalletError(walletError);
    }

    if (transaction) {
      setMutationHash(transaction.hash);
      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }
    return true;
  }, [
    tokenData,
    walletProvider,
    longOptionReaderQuery,
    spenderAddress,
    inputValue,
    collateralTokenAddress,
    lendingPoolAddress,
    basicVaultAddress,
  ]);

  const runCancelPendingPositionMutation = useCallback(async () => {
    if (!walletProvider || !account) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const longVaultPositionManagerContract =
      LongVaultPositionManagerAbiFactory.connect(spenderAddress, signer);

    const cancelPendingPositionParameters = [
      basicVaultAddress,
      lendingPoolAddress,
    ] as const;

    let transaction = null;

    try {
      await longVaultPositionManagerContract.callStatic.cancelQueue(
        ...cancelPendingPositionParameters
      );

      transaction = await longVaultPositionManagerContract.cancelQueue(
        ...cancelPendingPositionParameters
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
    account,
    basicVaultAddress,
    lendingPoolAddress,
    spenderAddress,
    walletProvider,
  ]);

  const runClosePositionAndWithdrawMutation = useCallback(async () => {
    if (!walletProvider || !account) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const longVaultPositionManagerContract =
      LongVaultPositionManagerAbiFactory.connect(spenderAddress, signer);

    const methodName = "closeVaultAndWithdrawPosition(address,address,address)";

    const closePositionParameters = [
      account,
      basicVaultAddress,
      lendingPoolAddress,
    ] as const;

    let transaction = null;

    try {
      await longVaultPositionManagerContract.callStatic[methodName](
        ...closePositionParameters
      );

      transaction = await longVaultPositionManagerContract[methodName](
        ...closePositionParameters
      );
    } catch (walletError) {
      processWalletError(walletError);
    }

    if (transaction) {
      setMutationHash(transaction.hash);

      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }

    return true;
  }, [
    account,
    basicVaultAddress,
    lendingPoolAddress,
    spenderAddress,
    walletProvider,
  ]);

  const runClosePositionAndWithdrawImmediatelyMutation =
    // eslint-disable-next-line complexity
    useCallback(async () => {
      if (!walletProvider || !account) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const { quoterAddress } = chainsMap[basicVaultChainId].addresses;

      const longVaultPositionManagerContract =
        LongVaultPositionManagerAbiFactory.connect(spenderAddress, signer);

      // TODO: return when partial withdrawals are supported
      // const depositAmount = new Big(inputValue)
      //   .mul(tokenData.tokenDivisor)
      //   .round();

      const { data } = longVaultReaderQuery;
      const { balance = undefined, tokenDivisor = undefined } =
        data?.debtToken ?? {};
      const debtTokenBalance =
        balance && tokenDivisor ? balance.mul(tokenDivisor) : new Big(0);

      const parameters = {
        tokenIn: collateralTokenAddress,
        tokenOut: basicVaultAddress,
        amount: debtTokenBalance.toString(),
        fee: 500,
        sqrtPriceLimitX96: 0,
      };

      const quoteOutput = await quoteExactOutputSingle(
        parameters,
        basicVaultChainId,
        quoterAddress,
        signer
      );

      // slippage allowance - 0.05%
      const maxCollateralToUse = quoteOutput.mul(1.0005).round();

      const closePositionImmediatelyMethodName =
        "closeVaultAndWithdrawPosition(address,address,address,uint256)";

      const closePositionImmediatelyParameters = [
        account,
        basicVaultAddress,
        lendingPoolAddress,
        maxCollateralToUse.toString(),
      ] as const;

      const closePositionMethodName =
        "closeVaultAndWithdrawPosition(address,address,address)";

      const closePositionParameters = [
        account,
        basicVaultAddress,
        lendingPoolAddress,
      ] as const;

      let transaction = null;

      let isUseImmediateMethod = false;

      try {
        // we try to close position immediately with swap firstly
        await longVaultPositionManagerContract.callStatic[
          closePositionImmediatelyMethodName
        ](...closePositionImmediatelyParameters);

        isUseImmediateMethod = true;
      } catch {
        // but if it fails we try to close position using old method
        isUseImmediateMethod = false;
      }

      try {
        if (isUseImmediateMethod) {
          await longVaultPositionManagerContract.callStatic[
            closePositionImmediatelyMethodName
          ](...closePositionImmediatelyParameters);

          transaction = await longVaultPositionManagerContract[
            closePositionImmediatelyMethodName
          ](...closePositionImmediatelyParameters);
        } else {
          await longVaultPositionManagerContract.callStatic[
            closePositionMethodName
          ](...closePositionParameters);

          transaction = await longVaultPositionManagerContract[
            closePositionMethodName
          ](...closePositionParameters);
        }
      } catch (walletError) {
        processWalletError(walletError);
      }

      if (transaction) {
        setMutationHash(transaction.hash);

        try {
          await transaction.wait();
        } catch (transactionError) {
          processTransactionError(transactionError);
        }
      }

      return true;
    }, [
      account,
      basicVaultAddress,
      lendingPoolAddress,
      spenderAddress,
      walletProvider,
      basicVaultChainId,
      longVaultReaderQuery,
      collateralTokenAddress,
    ]);

  const handleMutationSuccess = useCallback(async () => {
    const { collateralTokenQuery, nativeTokenQuery } = tokensQueries;

    await delay(3000);

    await Promise.all([
      collateralTokenQuery ? collateralTokenQuery.refetch() : null,
      nativeTokenQuery ? nativeTokenQuery.refetch() : null,
      longVaultReaderQuery.refetch(),
      collateralAssetQuery.refetch(),
    ]);
  }, [longVaultReaderQuery, collateralAssetQuery, tokensQueries]);

  const approveDelegationMutation = useMutation<boolean, MutationError>(
    async () => await runApproveDelegationMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const openPositionMutation = useMutation<boolean, MutationError>(
    async () => await runOpenPositionMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const openPositionImmediatelyMutation = useMutation<boolean, MutationError>(
    async () => await runOpenPositionImmediatelyMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const cancelPendingPositionMutation = useMutation<boolean, MutationError>(
    async () => await runCancelPendingPositionMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const closePositionAndWithdrawMutation = useMutation<boolean, MutationError>(
    async () => await runClosePositionAndWithdrawMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const closePositionAndWithdrawImmediatelyMutation = useMutation<
    boolean,
    MutationError
  >(async () => await runClosePositionAndWithdrawImmediatelyMutation(), {
    onSuccess: handleMutationSuccess,
  });

  useResetMutationError(openPositionMutation);
  useResetMutationError(openPositionImmediatelyMutation);

  return {
    approveDelegationMutation,
    openPositionMutation,
    openPositionImmediatelyMutation,
    cancelPendingPositionMutation,
    closePositionAndWithdrawMutation,
    closePositionAndWithdrawImmediatelyMutation,

    mutationHash,

    runApproveDelegation: () => {
      approveDelegationMutation.mutate();
    },

    runOpenPosition: () => {
      openPositionMutation.mutate();
    },

    runOpenPositionImmediately: () => {
      openPositionImmediatelyMutation.mutate();
    },

    runCancelPendingPosition: () => {
      cancelPendingPositionMutation.mutate();
    },

    runClosePositionAndWithdraw: () => {
      closePositionAndWithdrawMutation.mutate();
    },

    runClosePositionAndWithdrawImmediately: () => {
      closePositionAndWithdrawImmediatelyMutation.mutate();
    },
  };
};
