import { useCallback, useMemo, useState } from "react";
import Big from "big.js";
import { useMutation, useQueryClient } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { useModalVault } from "./useModalVault";

enum DepositMutation {
  approvePermanentAllowance = "approvePermanentAllowance",
  approveOneTimeAllowance = "approveOneTimeAllowance",
  deposit = "deposit",
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const useDepositState = () => {
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
    async (mutationType: DepositMutation) => {
      if (
        !vault ||
        !vault.approve ||
        !vault.approvePermanent ||
        !vault.deposit
      ) {
        return;
      }

      let transaction = null;
      try {
        switch (mutationType) {
          case DepositMutation.approvePermanentAllowance:
            transaction = await vault.approvePermanent();
            break;
          case DepositMutation.approveOneTimeAllowance:
            transaction = await vault.approve(bigNumberAmount.toString());
            break;
          case DepositMutation.deposit:
            transaction = await vault.deposit(bigNumberAmount.toString());
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

  const {
    mutate: approvePermanentAllowance,
    isLoading: isPermanentAllowanceApproving,
  } = useMutation(
    async () => {
      await mutateVault(DepositMutation.approvePermanentAllowance);
    },
    {
      onSuccess: handleMutationOnSuccess,
    }
  );

  const {
    mutate: approveOneTimeAllowance,
    isLoading: isOneTimeAllowanceApproving,
  } = useMutation(
    async () => {
      await mutateVault(DepositMutation.approveOneTimeAllowance);
    },
    {
      onSuccess: handleMutationOnSuccess,
    }
  );

  const { mutate: deposit, isLoading: isDepositing } = useMutation(
    async () => {
      await mutateVault(DepositMutation.deposit);
    },
    {
      onSuccess: handleMutationOnSuccess,
    }
  );

  if (!vault) {
    return null;
  }

  const { currentDeposit, maxDeposit, userWalletBalance, userWalletAllowance } =
    vault;

  const isValidAmount = bigNumberAmount.gt(0);

  const isExceedBalance = userWalletBalance
    ? bigNumberAmount.gt(userWalletBalance)
    : false;

  const isExceedVaultMax =
    currentDeposit && maxDeposit
      ? bigNumberAmount.add(currentDeposit).gt(maxDeposit)
      : false;

  const isExceedAllowance = userWalletAllowance
    ? bigNumberAmount.gt(userWalletAllowance)
    : false;

  return {
    amount: stringAmount,
    setAmount: setStringAmount,
    isValidAmount,
    isExceedBalance,
    isExceedVaultMax,
    isExceedAllowance,
    isPermanentAllowanceApproving,
    isOneTimeAllowanceApproving,
    isDepositing,

    approvePermanentAllowance: () => {
      approvePermanentAllowance();
    },

    approveOneTimeAllowance: () => {
      approveOneTimeAllowance();
    },

    deposit: () => {
      deposit();
    },
  };
};
