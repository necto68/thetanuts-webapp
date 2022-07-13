import { useMutation } from "react-query";
import { useCallback, useState } from "react";
import { constants } from "ethers";
import Big from "big.js";

import type { BasicModalMutations } from "../types";
import type { MutationError } from "../../index-vault-modal/types";
import {
  delay,
  processWalletError,
  processTransactionError,
} from "../../shared/helpers";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  BasicVaultAbi__factory as BasicVaultAbiFactory,
} from "../../contracts/types";
import { useResetMutationError } from "../../index-vault-modal/hooks/useResetMutationError";

import { useBasicModalConfig } from "./useBasicModalConfig";
import { useBasicModalState } from "./useBasicModalState";

export const useBasicModalProviderMutations = (): BasicModalMutations => {
  const {
    walletProvider,
    basicVaultAddress,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();

  const { inputValue, tokenData, tokensQueries } = useBasicModalState();

  const [mutationHash, setMutationHash] = useState<string>();

  const runApproveAllowanceMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const collateralTokenContract = Erc20AbiFactory.connect(
      tokenData.tokenAddress,
      signer
    );

    const approveParameters = [
      basicVaultAddress,
      constants.MaxUint256,
    ] as const;

    let transaction = null;

    try {
      await collateralTokenContract.callStatic.approve(...approveParameters);

      transaction = await collateralTokenContract.approve(...approveParameters);
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
  }, [tokenData, walletProvider, basicVaultAddress]);

  const runDepositMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const basicVaultContract = BasicVaultAbiFactory.connect(
      basicVaultAddress,
      signer
    );

    const depositAmount = new Big(inputValue)
      .mul(tokenData.tokenDivisor)
      .round()
      .toString();

    let transaction = null;

    try {
      await basicVaultContract.callStatic.deposit(depositAmount);

      transaction = await basicVaultContract.deposit(depositAmount);
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
  }, [tokenData, walletProvider, basicVaultAddress, inputValue]);

  const runInitWithdrawMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const basicVaultContract = BasicVaultAbiFactory.connect(
      basicVaultAddress,
      signer
    );

    // need to divide by valuePerLP
    // because initWithdraw() should be called only with LP token amount
    // not collateral token amount
    const { data } = basicVaultQuery;
    const { valuePerLP = new Big(1) } = data ?? {};

    // TODO: need to use basicVaultTokenDivisor
    //  not tokenData.tokenDivisor
    const withdrawAmount = new Big(inputValue)
      .div(valuePerLP)
      .mul(tokenData.tokenDivisor)
      .round()
      .toString();

    let transaction = null;

    try {
      await basicVaultContract.callStatic.initWithdraw(withdrawAmount);

      transaction = await basicVaultContract.initWithdraw(withdrawAmount);
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
    basicVaultAddress,
    basicVaultQuery,
    inputValue,
  ]);

  const runWithdrawMutation = useCallback(async () => {
    if (!walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const basicVaultContract = BasicVaultAbiFactory.connect(
      basicVaultAddress,
      signer
    );

    let transaction = null;

    try {
      await basicVaultContract.callStatic.withdraw();

      transaction = await basicVaultContract.withdraw();
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
  }, [walletProvider, basicVaultAddress]);

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

  const approveAllowanceMutation = useMutation<boolean, MutationError>(
    async () => await runApproveAllowanceMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const depositMutation = useMutation<boolean, MutationError>(
    async () => await runDepositMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const initWithdrawMutation = useMutation<boolean, MutationError>(
    async () => await runInitWithdrawMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const withdrawMutation = useMutation<boolean, MutationError>(
    async () => await runWithdrawMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  useResetMutationError(approveAllowanceMutation);
  useResetMutationError(depositMutation);
  useResetMutationError(initWithdrawMutation);
  useResetMutationError(withdrawMutation);

  return {
    approveAllowanceMutation,
    depositMutation,
    initWithdrawMutation,
    withdrawMutation,

    mutationHash,

    runApproveAllowance: () => {
      approveAllowanceMutation.mutate();
    },

    runDeposit: () => {
      depositMutation.mutate();
    },

    runInitWithdraw: () => {
      initWithdrawMutation.mutate();
    },

    runWithdraw: () => {
      withdrawMutation.mutate();
    },
  };
};
