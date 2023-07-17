import { useMutation } from "react-query";
import { useCallback, useState } from "react";
import { constants } from "ethers";
import Big from "big.js";

import { useWallet } from "../../wallet/hooks/useWallet";
import type { LongModalMutations } from "../types";
import type { MutationError } from "../../index-vault-modal/types";
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

import { useLongModalConfig } from "./useLongModalConfig";

export const useLongModalProviderMutations = (): LongModalMutations => {
  const { wallet, walletAddress } = useWallet();

  const { walletProvider, basicVaultAddress, spenderAddress } =
    useBasicModalConfig();
  const { longVaultReaderQuery, collateralAssetQuery } = useLongModalConfig();

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

    const {
      collateralToken,
      loanToValue = 0,
      collateralPrice = 0,
    } = collateralAssetData ?? {};

    const { data } = longVaultReaderQuery;
    const { debtTokenPrice = 0 } = data ?? {};

    const { tokenAddress: collateralAssetAddress = "" } = collateralToken ?? {};

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
      collateralAssetAddress,
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
  ]);

  const runCancelPendingPositionMutation = useCallback(async () => {
    if (!walletProvider || !wallet) {
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
    walletProvider,
    wallet,
    spenderAddress,
    basicVaultAddress,
    lendingPoolAddress,
  ]);

  const runClosePositionAndWithdrawMutation = useCallback(async () => {
    if (!walletProvider || !wallet) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const longVaultPositionManagerContract =
      LongVaultPositionManagerAbiFactory.connect(spenderAddress, signer);

    const closePositionParameters = [
      walletAddress,
      basicVaultAddress,
      lendingPoolAddress,
    ] as const;

    let transaction = null;

    try {
      await longVaultPositionManagerContract.callStatic.closeVaultAndWithdrawPosition(
        ...closePositionParameters
      );

      transaction =
        await longVaultPositionManagerContract.closeVaultAndWithdrawPosition(
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
    walletAddress,
    basicVaultAddress,
    lendingPoolAddress,
    spenderAddress,
    walletProvider,
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

  useResetMutationError(openPositionMutation);

  return {
    approveDelegationMutation,
    openPositionMutation,
    cancelPendingPositionMutation,
    closePositionAndWithdrawMutation,

    mutationHash,

    runApproveDelegation: () => {
      approveDelegationMutation.mutate();
    },

    runOpenPosition: () => {
      openPositionMutation.mutate();
    },

    runCancelPendingPosition: () => {
      cancelPendingPositionMutation.mutate();
    },

    runClosePositionAndWithdraw: () => {
      closePositionAndWithdrawMutation.mutate();
    },
  };
};
