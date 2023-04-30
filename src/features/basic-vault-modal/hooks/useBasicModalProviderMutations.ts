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
  BasicVaultDepositorAbi__factory as BasicVaultDepositorAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
} from "../../contracts/types";
import { useResetMutationError } from "../../index-vault-modal/hooks/useResetMutationError";
import { BasicVaultType } from "../../basic/types/basicVaultConfig";
import { basicVaultsIdsThatSupportDepositor } from "../../basic/constants";
import { LPOOL_ADDRESS } from "../constants";

import { useBasicModalConfig } from "./useBasicModalConfig";
import { useBasicModalState } from "./useBasicModalState";

export const useBasicModalProviderMutations = (): BasicModalMutations => {
  const {
    walletProvider,
    basicVaultAddress,
    basicVaultDepositorAddress,
    spenderAddress,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { inputValue, setInputValue, tokenData, nativeData, tokensQueries } =
    useBasicModalState();

  const [mutationHash, setMutationHash] = useState<string>();
  const [boostHash, setBoostHash] = useState<string>();

  const runApproveAllowanceMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const collateralTokenContract = Erc20AbiFactory.connect(
      tokenData.tokenAddress,
      signer
    );

    const approveParameters = [spenderAddress, constants.MaxUint256] as const;

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
  }, [tokenData, walletProvider, spenderAddress]);

  const runWrapMutation = useCallback(async () => {
    if (!nativeData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const wrappedTokenContract = Erc20AbiFactory.connect(
      nativeData.wrappedNativeTokenAddress,
      signer
    );

    const depositAmount = new Big(inputValue)
      .mul(nativeData.tokenDivisor)
      .round()
      .toString();

    const overrides = { value: depositAmount };

    let transaction = null;

    try {
      await wrappedTokenContract.callStatic.deposit(overrides);

      transaction = await wrappedTokenContract.deposit(overrides);
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
  }, [nativeData, walletProvider, inputValue]);

  const runDepositMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const basicVaultContract = BasicVaultAbiFactory.connect(
      basicVaultAddress,
      signer
    );

    const basicVaultDepositorContract = BasicVaultDepositorAbiFactory.connect(
      basicVaultDepositorAddress,
      signer
    );

    const { data } = basicVaultQuery;
    const { id = "", basicVaultType = BasicVaultType.BASIC } = data ?? {};

    const depositAmount = new Big(inputValue)
      .mul(tokenData.tokenDivisor)
      .round()
      .toString();

    let transaction = null;

    try {
      // we are using basicVaultDepositorContract only for degen vaults
      // and for ETH and BTC call/put basic vaults
      // TODO: Remove this when we support depositor for all basic vaults
      if (
        basicVaultType === BasicVaultType.DEGEN ||
        basicVaultsIdsThatSupportDepositor.includes(id)
      ) {
        await basicVaultDepositorContract.callStatic.deposit(
          basicVaultAddress,
          depositAmount
        );

        transaction = await basicVaultDepositorContract.deposit(
          basicVaultAddress,
          depositAmount
        );
      } else {
        await basicVaultContract.callStatic.deposit(depositAmount);

        transaction = await basicVaultContract.deposit(depositAmount);
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
    tokenData,
    walletProvider,
    basicVaultAddress,
    basicVaultDepositorAddress,
    basicVaultQuery,
    inputValue,
  ]);

  const runCancelDepositMutation = useCallback(async () => {
    if (!walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const basicVaultDepositorContract = BasicVaultDepositorAbiFactory.connect(
      basicVaultDepositorAddress,
      signer
    );

    let transaction = null;

    try {
      await basicVaultDepositorContract.callStatic.cancelDeposit(
        basicVaultAddress
      );

      transaction = await basicVaultDepositorContract.cancelDeposit(
        basicVaultAddress
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
  }, [walletProvider, basicVaultAddress, basicVaultDepositorAddress]);

  const runInitWithdrawMutation = useCallback(
    // eslint-disable-next-line complexity
    async (options: { isCancel?: boolean; isFullPosition?: boolean }) => {
      if (!tokenData || !walletProvider) {
        return false;
      }

      const { isCancel = false, isFullPosition = false } = options;

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

      const { data: basicVaultReaderData } = basicVaultReaderQuery;
      const { lpBalance = new Big(0) } = basicVaultReaderData ?? {};

      let inputAmount = new Big(0);

      if (isCancel) {
        // isCancel for initWithdraw(0)
        inputAmount = new Big(0);
      } else if (isFullPosition) {
        // isFullPosition for initWithdraw(currentPosition)
        // for degen vaults

        const lpDivisor = new Big(10).pow(18);

        inputAmount =
          lpBalance
            ?.mul(valuePerLP)
            .mul(lpDivisor)
            .div(tokenData.tokenDivisor) ?? new Big(0);
      } else {
        // for other cases - initWithdraw(inputValue)
        inputAmount = inputValue ? new Big(inputValue) : new Big(0);
      }

      const withdrawAmount = inputAmount
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
        try {
          await transaction.wait();
        } catch (transactionError) {
          processTransactionError(transactionError);
        }
      }

      return true;
    },
    [
      tokenData,
      walletProvider,
      basicVaultAddress,
      basicVaultQuery,
      basicVaultReaderQuery,
      inputValue,
    ]
  );

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

  const runApproveLpoolAllowanceMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const lpTokenContract = Erc20AbiFactory.connect(
      tokenData.tokenAddress,
      signer
    );

    const approveParameters = [LPOOL_ADDRESS, constants.MaxUint256] as const;
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
  }, [tokenData, walletProvider]);

  const runBoostMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const lendingPoolContract = LendingPoolAbiFactory.connect(
      LPOOL_ADDRESS,
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
      processWalletError(walletError);
    }

    if (transaction) {
      setMutationHash(transaction.hash);
      setBoostHash(transaction.hash);

      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }

    return true;
  }, [tokenData, walletProvider, basicVaultAddress, inputValue]);

  const runUnboostMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const lendingPoolContract = LendingPoolAbiFactory.connect(
      LPOOL_ADDRESS,
      signer
    );

    const depositAmount = new Big(inputValue)
      .mul(tokenData.tokenDivisor)
      .round()
      .toString();

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
      processWalletError(walletError);
    }

    if (transaction) {
      setMutationHash(transaction.hash);
      setBoostHash(transaction.hash);

      try {
        await transaction.wait();
      } catch (transactionError) {
        processTransactionError(transactionError);
      }
    }

    return true;
  }, [tokenData, walletProvider, basicVaultAddress, inputValue]);

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

  const wrapMutation = useMutation<boolean, MutationError>(
    async () => await runWrapMutation(),
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

  const cancelDepositMutation = useMutation<boolean, MutationError>(
    async () => await runCancelDepositMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

  const initWithdrawMutation = useMutation<boolean, MutationError>(
    async () =>
      await runInitWithdrawMutation({ isCancel: false, isFullPosition: false }),
    {
      onSuccess: async () => {
        await handleMutationSuccess();
        setInputValue("");
      },
    }
  );

  const initFullWithdrawMutation = useMutation<boolean, MutationError>(
    async () => await runInitWithdrawMutation({ isFullPosition: true }),
    {
      onSuccess: async () => {
        await handleMutationSuccess();
        setInputValue("");
      },
    }
  );

  const cancelWithdrawMutation = useMutation<boolean, MutationError>(
    async () => await runInitWithdrawMutation({ isCancel: true }),
    {
      onSuccess: async () => {
        await handleMutationSuccess();
        setInputValue("");
      },
    }
  );

  const withdrawMutation = useMutation<boolean, MutationError>(
    async () => await runWithdrawMutation(),
    {
      onSuccess: handleMutationSuccess,
    }
  );

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

  useResetMutationError(approveAllowanceMutation);
  useResetMutationError(wrapMutation);
  useResetMutationError(depositMutation);
  useResetMutationError(cancelDepositMutation);
  useResetMutationError(initWithdrawMutation);
  useResetMutationError(initFullWithdrawMutation);
  useResetMutationError(cancelWithdrawMutation);
  useResetMutationError(withdrawMutation);
  useResetMutationError(approveLpoolAllowanceMutation);
  useResetMutationError(boostMutation);
  useResetMutationError(unboostMutation);

  return {
    approveAllowanceMutation,
    wrapMutation,
    depositMutation,
    cancelDepositMutation,
    initWithdrawMutation,
    initFullWithdrawMutation,
    cancelWithdrawMutation,
    withdrawMutation,
    approveLpoolAllowanceMutation,
    boostMutation,
    unboostMutation,

    mutationHash,
    boostHash,

    runApproveAllowance: () => {
      approveAllowanceMutation.mutate();
    },

    runWrap: () => {
      wrapMutation.mutate();
    },

    runDeposit: () => {
      depositMutation.mutate();
    },

    runCancelDeposit: () => {
      cancelDepositMutation.mutate();
    },

    runInitWithdraw: () => {
      initWithdrawMutation.mutate();
    },

    runInitFullWithdraw: () => {
      initFullWithdrawMutation.mutate();
    },

    runCancelWithdraw: () => {
      cancelWithdrawMutation.mutate();
    },

    runWithdraw: () => {
      withdrawMutation.mutate();
    },

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
