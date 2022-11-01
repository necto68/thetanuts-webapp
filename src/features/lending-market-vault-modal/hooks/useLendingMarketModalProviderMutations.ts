import { useWallet } from "@gimmixorg/use-wallet";
import { useMutation } from "react-query";
import { useCallback, useState } from "react";
import { constants } from "ethers";
import Big from "big.js";

import type { LendingMarketModalMutations } from "../types";
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
  LendingMarketPositionManagerAbi__factory as LendingMarketPositionManagerAbiFactory,
  DebtTokenAbi__factory as DebtTokenAbiFactory,
} from "../../contracts/types";

import { useLendingMarketModalConfig } from "./useLendingMarketModalConfig";

export const useLendingMarketModalProviderMutations =
  (): LendingMarketModalMutations => {
    const { account } = useWallet();

    const { walletProvider, basicVaultAddress, spenderAddress } =
      useBasicModalConfig();
    const { lendingMarketVaultReaderQuery, collateralAssetQuery } =
      useLendingMarketModalConfig();

    const { inputValue, tokenData, tokensQueries } = useBasicModalState();

    const [mutationHash, setMutationHash] = useState<string>();

    const { data: collateralAssetData } = collateralAssetQuery;
    const { lendingPoolAddress = "" } = collateralAssetData ?? {};

    const runApproveDelegationMutation = useCallback(async () => {
      if (!walletProvider) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const { data } = lendingMarketVaultReaderQuery;
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
    }, [walletProvider, lendingMarketVaultReaderQuery, spenderAddress]);

    const runOpenPositionMutation = useCallback(async () => {
      if (!tokenData || !walletProvider) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const lendingMarketPositionManagerContract =
        LendingMarketPositionManagerAbiFactory.connect(spenderAddress, signer);

      const {
        collateralToken,
        loanToValue = 0,
        collateralPrice = 0,
      } = collateralAssetData ?? {};

      const { data } = lendingMarketVaultReaderQuery;
      const { debtTokenPrice = 0 } = data ?? {};

      const { tokenAddress: collateralAssetAddress = "" } =
        collateralToken ?? {};

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
        await lendingMarketPositionManagerContract.callStatic.depositAndQueueOptionPosition(
          ...openPositionParameters
        );

        transaction =
          await lendingMarketPositionManagerContract.depositAndQueueOptionPosition(
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
      lendingMarketVaultReaderQuery,
      lendingPoolAddress,
      spenderAddress,
      tokenData,
      walletProvider,
    ]);

    const runCancelPendingPositionMutation = useCallback(async () => {
      if (!walletProvider || !account) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const lendingMarketPositionManagerContract =
        LendingMarketPositionManagerAbiFactory.connect(spenderAddress, signer);

      const cancelPendingPositionParameters = [
        basicVaultAddress,
        lendingPoolAddress,
      ] as const;

      let transaction = null;

      try {
        await lendingMarketPositionManagerContract.callStatic.cancelQueue(
          ...cancelPendingPositionParameters
        );

        transaction = await lendingMarketPositionManagerContract.cancelQueue(
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

      const lendingMarketPositionManagerContract =
        LendingMarketPositionManagerAbiFactory.connect(spenderAddress, signer);

      const closePositionParameters = [
        account,
        basicVaultAddress,
        lendingPoolAddress,
      ] as const;

      let transaction = null;

      try {
        await lendingMarketPositionManagerContract.callStatic.closeVaultAndWithdrawPosition(
          ...closePositionParameters
        );

        transaction =
          await lendingMarketPositionManagerContract.closeVaultAndWithdrawPosition(
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

    const handleMutationSuccess = useCallback(async () => {
      const { collateralTokenQuery, nativeTokenQuery } = tokensQueries;

      await delay(3000);

      await Promise.all([
        collateralTokenQuery ? collateralTokenQuery.refetch() : null,
        nativeTokenQuery ? nativeTokenQuery.refetch() : null,
        lendingMarketVaultReaderQuery.refetch(),
        collateralAssetQuery.refetch(),
      ]);
    }, [lendingMarketVaultReaderQuery, collateralAssetQuery, tokensQueries]);

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

    const closePositionAndWithdrawMutation = useMutation<
      boolean,
      MutationError
    >(async () => await runClosePositionAndWithdrawMutation(), {
      onSuccess: handleMutationSuccess,
    });

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
