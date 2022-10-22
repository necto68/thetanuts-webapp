import { useMutation } from "react-query";
import { useCallback, useState } from "react";
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
  PriceOracleAbi__factory as PriceOracleAbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers/converters";

import { useLendingMarketModalConfig } from "./useLendingMarketModalConfig";

export const useLendingMarketModalProviderMutations =
  (): LendingMarketModalMutations => {
    const { walletProvider, basicVaultAddress, spenderAddress } =
      useBasicModalConfig();
    const { lendingPoolAddress, collateralAssetQuery } =
      useLendingMarketModalConfig();

    const { inputValue, tokenData, tokensQueries } = useBasicModalState();

    const [mutationHash, setMutationHash] = useState<string>();

    const runOpenPositionMutation = useCallback(async () => {
      if (!tokenData || !walletProvider) {
        return false;
      }

      const signer = walletProvider.getSigner();

      const lendingMarketPositionManagerContract =
        LendingMarketPositionManagerAbiFactory.connect(spenderAddress, signer);

      const { data } = collateralAssetQuery;
      const { priceOracleAddress = "", loanToValue = 0, token } = data ?? {};
      const { tokenAddress: collateralAssetAddress = "" } = token ?? {};

      const priceOracleContract = PriceOracleAbiFactory.connect(
        priceOracleAddress,
        signer
      );

      const [collateralPrice, borrowPrice] = await Promise.all([
        priceOracleContract
          .getAssetPrice(collateralAssetAddress)
          .then(convertToBig),
        priceOracleContract.getAssetPrice(basicVaultAddress).then(convertToBig),
      ]);

      const depositAmount = new Big(inputValue)
        .mul(tokenData.tokenDivisor)
        .round();

      const availableForBorrow = depositAmount
        .mul(collateralPrice)
        .mul(loanToValue);

      const LPToBorrowAmount = availableForBorrow
        .div(1 - loanToValue)
        .div(borrowPrice)
        .round()
        .toString();

      let transaction = null;

      try {
        await lendingMarketPositionManagerContract.callStatic.depositAndQueueOptionPosition(
          collateralAssetAddress,
          depositAmount.toString(),
          lendingPoolAddress,
          basicVaultAddress,
          LPToBorrowAmount
        );

        transaction =
          await lendingMarketPositionManagerContract.depositAndQueueOptionPosition(
            collateralAssetAddress,
            depositAmount.toString(),
            lendingPoolAddress,
            basicVaultAddress,
            LPToBorrowAmount
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
      collateralAssetQuery,
      inputValue,
      lendingPoolAddress,
      spenderAddress,
      tokenData,
      walletProvider,
    ]);

    const handleMutationSuccess = useCallback(async () => {
      const { collateralTokenQuery, nativeTokenQuery } = tokensQueries;

      await delay(3000);

      await Promise.all([
        collateralTokenQuery ? collateralTokenQuery.refetch() : null,
        nativeTokenQuery ? nativeTokenQuery.refetch() : null,
        collateralAssetQuery.refetch(),
      ]);
    }, [collateralAssetQuery, tokensQueries]);

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
