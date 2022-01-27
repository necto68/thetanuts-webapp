import { useCallback, useState } from 'react';
import Big from 'big.js';
import { useMutation, useQueryClient } from 'react-query';
import { useWallet } from '@gimmixorg/use-wallet';
import { useModalVault } from './useModalVault';

enum DepositMutations {
  approvePermanentAllowance,
  approveOneTimeAllowance,
  deposit,
}

export const useDepositState = () => {
  const vault = useModalVault();
  const { network } = useWallet();
  const queryClient = useQueryClient();

  const [stringAmount, setStringAmount] = useState('');
  const bigNumberAmount = Big(stringAmount || 0);

  const handleMutationOnSuccess = useCallback(async () => {
    if (!vault || !network) {
      return;
    }

    await queryClient.invalidateQueries([vault.address, network.chainId]);
    setStringAmount('');
  }, [vault, network, queryClient]);

  const mutateVault = useCallback(
    async (mutationType: DepositMutations) => {
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
          case DepositMutations.approvePermanentAllowance:
            transaction = await vault.approvePermanent();
            break;
          case DepositMutations.approveOneTimeAllowance:
            transaction = await vault.approve(bigNumberAmount.toString());
            break;
          case DepositMutations.deposit:
            transaction = await vault.deposit(bigNumberAmount.toString());
            break;
        }

        if (transaction) {
          await transaction.wait();
        }
      } catch (e) {
        console.error(e);
      }
    },
    [vault, bigNumberAmount],
  );

  const {
    mutate: approvePermanentAllowance,
    isLoading: isPermanentAllowanceApproving,
  } = useMutation(
    () => mutateVault(DepositMutations.approvePermanentAllowance),
    {
      onSuccess: handleMutationOnSuccess,
    },
  );

  const {
    mutate: approveOneTimeAllowance,
    isLoading: isOneTimeAllowanceApproving,
  } = useMutation(() => mutateVault(DepositMutations.approveOneTimeAllowance), {
    onSuccess: handleMutationOnSuccess,
  });

  const { mutate: deposit, isLoading: isDepositing } = useMutation(
    () => mutateVault(DepositMutations.deposit),
    {
      onSuccess: handleMutationOnSuccess,
    },
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
    approvePermanentAllowance: () => approvePermanentAllowance(),
    approveOneTimeAllowance: () => approveOneTimeAllowance(),
    deposit: () => deposit(),
  };
};
