import { useMutation } from "react-query";
import { useCallback, useState } from "react";

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

// import {
//   LendingMarketPositionManagerAbi__factory as LendingMarketPositionManagerAbiFactory,
// } from "../../contracts/types";

export const useLendingMarketModalProviderMutations =
  (): LendingMarketModalMutations => {
    const {
      walletProvider,

      // basicVaultAddress,
      // basicVaultDepositorAddress,

      // spenderAddress,
      basicVaultQuery,
      basicVaultReaderQuery,
    } = useBasicModalConfig();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { inputValue, tokenData, tokensQueries } = useBasicModalState();

    const [mutationHash, setMutationHash] = useState<string>();

    const runOpenPositionMutation = useCallback(async () => {
      if (!tokenData || !walletProvider) {
        return false;
      }

      // const signer = walletProvider.getSigner();

      // const basicVaultContract = BasicVaultAbiFactory.connect(
      //   basicVaultAddress,
      //   signer
      // );

      // const basicVaultDepositorContract = BasicVaultDepositorAbiFactory.connect(
      //   basicVaultDepositorAddress,
      //   signer
      // );

      // const lendingMarketPositionManagerContract =
      //   LendingMarketPositionManagerAbiFactory.connect("", signer);

      // const { data } = basicVaultQuery;
      // const { basicVaultType = BasicVaultType.BASIC } = data ?? {};

      // const depositAmount = new Big(inputValue)
      //   .mul(tokenData.tokenDivisor)
      //   .round()
      //   .toString();

      const transaction = null;

      try {
        // lendingMarketPositionManagerContract.depositAndQueueOptionPosition('')
        // // we are using basicVaultDepositorContract only for degen vaults
        // if (basicVaultType === BasicVaultType.DEGEN) {
        //   await basicVaultDepositorContract.callStatic.deposit(
        //     basicVaultAddress,
        //     depositAmount
        //   );
        //   transaction = await basicVaultDepositorContract.deposit(
        //     basicVaultAddress,
        //     depositAmount
        //   );
        // } else {
        //   await basicVaultContract.callStatic.deposit(depositAmount);
        //   transaction = await basicVaultContract.deposit(depositAmount);
        // }
      } catch (walletError) {
        processWalletError(walletError);
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (transaction) {
        // @ts-expect-error update later
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMutationHash(transaction.hash);

        try {
          // @ts-expect-error update later
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          await transaction.wait();
        } catch (transactionError) {
          processTransactionError(transactionError);
        }
      }

      return true;
    }, [tokenData, walletProvider]);

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

    const openPositionMutation = useMutation<boolean, MutationError>(
      async () => await runOpenPositionMutation(),
      {
        onSuccess: handleMutationSuccess,
      }
    );

    useResetMutationError(openPositionMutation);

    return {
      openPositionMutation,

      mutationHash,

      runOpenPosition: () => {
        openPositionMutation.mutate();
      },
    };
  };
