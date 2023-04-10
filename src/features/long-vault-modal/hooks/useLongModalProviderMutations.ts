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
  QuoterAbi__factory as QuoterAbiFactory,
  LongVaultPositionManagerAbi__factory as LongVaultPositionManagerAbiFactory,
  DebtTokenAbi__factory as DebtTokenAbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers/converters";

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

  // eslint-disable-next-line complexity
  const runOpenPositionImmediatelyMutation = useCallback(async () => {
    if (!tokenData || !walletProvider) {
      return false;
    }

    const signer = walletProvider.getSigner();

    const { quoterAddress } = chainsMap[basicVaultChainId].addresses;
    const quoterContract = QuoterAbiFactory.connect(quoterAddress, signer);

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

    let left = 0;
    let right = 100;
    let mid = 0;
    let depth = 0;
    let bestLPToBorrowAmount = new Big(0);
    let bestMinAmountToReceive = new Big(0);

    while (left <= right) {
      depth += 1;
      mid = Math.floor((left + right) / 2);

      const LPToBorrowAmount = availableForBorrow
        .div(1 - loanToValue)
        .div(debtTokenPrice)
        .mul(100 - mid)
        .div(100)
        .round();

      const minAmountToReceive =
        // eslint-disable-next-line no-await-in-loop
        await quoterContract.callStatic
          .quoteExactInputSingle(
            basicVaultAddress,
            collateralTokenAddress,
            500,
            depositAmount.toString(),
            0
          )
          .then(convertToBig);

      try {
        // eslint-disable-next-line no-await-in-loop
        await longVaultPositionManagerContract.callStatic.depositAndOpenBySwapOptionPosition(
          collateralTokenAddress,
          depositAmount.toString(),
          lendingPoolAddress,
          basicVaultAddress,
          LPToBorrowAmount.toString(),
          minAmountToReceive.toString()
        );

        // console.log(`Succeeded for ${mid}`);

        bestLPToBorrowAmount = LPToBorrowAmount;
        bestMinAmountToReceive = minAmountToReceive;

        if (depth > 5) {
          break;
        }

        right = mid - 1;
      } catch {
        // console.log(`Failed for ${mid}`);
        left = mid + 1;
      }
    }

    const openPositionImmediatelyParameters = [
      collateralTokenAddress,
      depositAmount.toString(),
      lendingPoolAddress,
      basicVaultAddress,
      bestLPToBorrowAmount.toString(),
      bestMinAmountToReceive.mul(0.9995).round().toString(),
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
    basicVaultChainId,
    spenderAddress,
    collateralAssetData,
    longVaultReaderQuery,
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
    useCallback(async () => {
      if (!walletProvider || !account) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const { quoterAddress } = chainsMap[basicVaultChainId].addresses;
      const quoterContract = QuoterAbiFactory.connect(quoterAddress, signer);

      const longVaultPositionManagerContract =
        LongVaultPositionManagerAbiFactory.connect(spenderAddress, signer);

      const { data } = longVaultReaderQuery;
      const { balance = undefined, tokenDivisor = undefined } =
        data?.debtToken ?? {};
      const debtTokenBalance =
        balance && tokenDivisor ? balance.mul(tokenDivisor) : new Big(0);

      const quoteOutput = await quoterContract.callStatic
        .quoteExactOutputSingle(
          collateralTokenAddress,
          basicVaultAddress,
          500,
          debtTokenBalance.toString(),
          0
        )
        .then(convertToBig);

      // slippage allowance - 0.05%
      const maxCollateralToUse = quoteOutput.mul(1.0005);

      const methodName =
        "closeVaultAndWithdrawPosition(address,address,address,uint256)";

      const closePositionImmediatelyParameters = [
        account,
        basicVaultAddress,
        lendingPoolAddress,
        maxCollateralToUse.toString(),
      ] as const;

      let transaction = null;

      try {
        await longVaultPositionManagerContract.callStatic[methodName](
          ...closePositionImmediatelyParameters
        );

        transaction = await longVaultPositionManagerContract[methodName](
          ...closePositionImmediatelyParameters
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
