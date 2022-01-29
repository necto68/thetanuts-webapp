import { useCallback, useMemo, useState } from "react";
import Big from "big.js";
import { useMutation, useQueryClient } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { useModalVault } from "./useModalVault";

enum WithdrawMutation {
  initWithdraw = "initWithdraw",
  cancelWithdraw = "cancelWithdraw",
  withdraw = "withdraw",
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const useWithdrawState = () => {
  const vault = useModalVault();
  const { network } = useWallet();
  const queryClient = useQueryClient();

  const [stringAmount, setStringAmount] = useState("");
  const bigNumberAmount = useMemo(
    () => new Big(stringAmount || 0),
    [stringAmount]
  );

  const handleMutationOnSuccess = useCallback(async () => {
    if (!vault || !network) {
      return;
    }

    await queryClient.invalidateQueries([vault.address, network.chainId]);
    setStringAmount("");
  }, [vault, network, queryClient]);

  const mutateVault = useCallback(
    async (mutationType: WithdrawMutation) => {
      if (
        !vault ||
        !vault.initWithdraw ||
        !vault.cancelWithdraw ||
        !vault.withdraw
      ) {
        return;
      }

      let transaction = null;
      try {
        switch (mutationType) {
          case WithdrawMutation.initWithdraw:
            transaction = await vault.initWithdraw(bigNumberAmount.toString());
            break;
          case WithdrawMutation.cancelWithdraw:
            transaction = await vault.cancelWithdraw();
            break;
          case WithdrawMutation.withdraw:
            transaction = await vault.withdraw();
            break;
          default:
            break;
        }

        if (transaction) {
          await transaction.wait();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    [vault, bigNumberAmount]
  );

  const { mutate: initWithdraw, isLoading: isInitiatingWithdraw } = useMutation(
    async () => {
      await mutateVault(WithdrawMutation.initWithdraw);
    },
    {
      onSuccess: handleMutationOnSuccess,
    }
  );

  const { mutate: cancelWithdraw, isLoading: isCancelingWithdraw } =
    useMutation(
      async () => {
        await mutateVault(WithdrawMutation.cancelWithdraw);
      },
      {
        onSuccess: handleMutationOnSuccess,
      }
    );

  const { mutate: withdraw, isLoading: isWithdrawing } = useMutation(
    async () => {
      await mutateVault(WithdrawMutation.withdraw);
    },
    {
      onSuccess: handleMutationOnSuccess,
    }
  );

  if (!vault) {
    return null;
  }

  const { userPosition, userPendingWithdrawal } = vault;

  const isValidAmount = bigNumberAmount.gt(0);

  const userBalance =
    userPosition && userPendingWithdrawal
      ? userPosition.add(userPendingWithdrawal)
      : new Big(0);

  const isExceedUserBalance = bigNumberAmount.gt(userBalance);

  return {
    amount: stringAmount,
    setAmount: setStringAmount,
    userBalance,
    isValidAmount,
    isExceedUserBalance,
    isInitiatingWithdraw,
    isCancelingWithdraw,
    isWithdrawing,

    initWithdraw: () => {
      initWithdraw();
    },

    cancelWithdraw: () => {
      cancelWithdraw();
    },

    withdraw: () => {
      withdraw();
    },
  };
};
