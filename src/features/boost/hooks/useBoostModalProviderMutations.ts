import { useMutation } from "react-query";
import { useCallback, useState } from "react";
import { constants } from "ethers";
import Big from "big.js";

import type { BoostModalMutations } from "../types";
import type { MutationError } from "../../index-vault-modal/types";
import {
  delay,
  processWalletError,
  processTransactionError,
} from "../../shared/helpers";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
} from "../../contracts/types";
import { useResetMutationError } from "../../index-vault-modal/hooks/useResetMutationError";
import { lendingPoolAddresses } from "../constants";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks/useBasicModalConfig";
import { useBasicModalState } from "../../basic-vault-modal/hooks/useBasicModalState";

export const useBoostModalProviderMutations = (): BoostModalMutations => {
  const {
    walletChainId,
    walletProvider,
    basicVaultAddress,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { inputValue, tokenData, tokensQueries } = useBasicModalState();

  const [boostHash, setBoostHash] = useState<string>();

  const resetBoostHash = useCallback(() => {
    setBoostHash(undefined);
  }, []);

  const runApproveLpoolAllowanceMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const lpTokenContract = Erc20AbiFactory.connect(
      tokenData.tokenAddress,
      signer
    );

    const approveParameters = [
      lendingPoolAddresses[walletChainId],
      constants.MaxUint256,
    ] as const;
    let transaction = null;

    try {
      await lpTokenContract.callStatic.approve(...approveParameters);

      transaction = await lpTokenContract.approve(...approveParameters);
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
  }, [tokenData, walletChainId, walletProvider]);

  const runBoostMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const lendingPoolContract = LendingPoolAbiFactory.connect(
      lendingPoolAddresses[walletChainId],
      signer
    );

    const depositAmount = new Big(inputValue)
      .mul(tokenData.tokenDivisor)
      .round()
      .toString();

    let transaction = null;

    try {
      await lendingPoolContract.callStatic.deposit(
        basicVaultAddress,
        depositAmount,
        await signer.getAddress(),
        0
      );

      transaction = await lendingPoolContract.deposit(
        basicVaultAddress,
        depositAmount,
        await signer.getAddress(),
        0
      );
    } catch (walletError) {
      processWalletError(walletError, "boost");
    }

    if (transaction) {
      setBoostHash(transaction.hash);

      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }

    return true;
  }, [tokenData, walletProvider, walletChainId, inputValue, basicVaultAddress]);

  const runUnboostMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const lendingPoolContract = LendingPoolAbiFactory.connect(
      lendingPoolAddresses[walletChainId],
      signer
    );

    const inputValueNumber = new Big(inputValue).toNumber();
    const tokenDataBalanceNumber = tokenData.balance
      ? tokenData.balance.toNumber()
      : 0;

    const depositAmount =
      inputValueNumber >= tokenDataBalanceNumber
        ? constants.MaxUint256
        : new Big(inputValue).mul(tokenData.tokenDivisor).round().toString();

    let transaction = null;

    try {
      await lendingPoolContract.callStatic.withdraw(
        basicVaultAddress,
        depositAmount,
        await signer.getAddress()
      );

      transaction = await lendingPoolContract.withdraw(
        basicVaultAddress,
        depositAmount,
        await signer.getAddress()
      );
    } catch (walletError) {
      processWalletError(walletError, "boost");
    }

    if (transaction) {
      setBoostHash(transaction.hash);

      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }

    return true;
  }, [tokenData, walletProvider, walletChainId, inputValue, basicVaultAddress]);

  const handleMutationSuccess = useCallback(async () => {
    const { collateralTokenQuery, nativeTokenQuery } = tokensQueries;

    await delay(3000);

    await Promise.all([
      collateralTokenQuery ? collateralTokenQuery.refetch() : null,
      nativeTokenQuery ? nativeTokenQuery.refetch() : null,
      basicVaultQuery.refetch(),
      basicVaultReaderQuery.refetch(),
    ]);
  }, [basicVaultQuery, basicVaultReaderQuery, tokensQueries]);

  const approveLpoolAllowanceMutation = useMutation<boolean, MutationError>(
    async () => await runApproveLpoolAllowanceMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const boostMutation = useMutation<boolean, MutationError>(
    async () => await runBoostMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const unboostMutation = useMutation<boolean, MutationError>(
    async () => await runUnboostMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  useResetMutationError(approveLpoolAllowanceMutation);
  useResetMutationError(boostMutation);
  useResetMutationError(unboostMutation);

  return {
    approveLpoolAllowanceMutation,
    boostMutation,
    unboostMutation,

    boostHash,
    resetBoostHash,

    runApproveLpoolAllowance: () => {
      approveLpoolAllowanceMutation.mutate();
    },

    runBoost: () => {
      boostMutation.mutate();
    },

    runUnboost: () => {
      unboostMutation.mutate();
    },
  };
};
