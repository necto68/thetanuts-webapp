import { useCallback, useState } from 'react';
import Big from 'big.js';
import { useMutation, useQueryClient } from 'react-query';
import { useWallet } from '@gimmixorg/use-wallet';
import { useModalVault } from './useModalVault';

enum WithdrawMutations {
  initWithdraw,
  cancelWithdraw,
  withdraw,
}

export const useWithdrawState = () => {
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
    async (mutationType: WithdrawMutations) => {
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
          case WithdrawMutations.initWithdraw:
            transaction = await vault.initWithdraw(bigNumberAmount.toString());
            break;
          case WithdrawMutations.cancelWithdraw:
            transaction = await vault.cancelWithdraw();
            break;
          case WithdrawMutations.withdraw:
            transaction = await vault.withdraw();
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

  const { mutate: initWithdraw, isLoading: isInitiatingWithdraw } = useMutation(
    () => mutateVault(WithdrawMutations.initWithdraw),
    {
      onSuccess: handleMutationOnSuccess,
    },
  );

  const { mutate: cancelWithdraw, isLoading: isCancelingWithdraw } =
    useMutation(() => mutateVault(WithdrawMutations.cancelWithdraw), {
      onSuccess: handleMutationOnSuccess,
    });

  const { mutate: withdraw, isLoading: isWithdrawing } = useMutation(
    () => mutateVault(WithdrawMutations.withdraw),
    {
      onSuccess: handleMutationOnSuccess,
    },
  );

  if (!vault) {
    return null;
  }

  const { userPosition, userPendingWithdrawal } = vault;

  const isValidAmount = bigNumberAmount.gt(0);

  const userBalance =
    userPosition && userPendingWithdrawal
      ? userPosition.add(userPendingWithdrawal)
      : Big(0);

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
    initWithdraw: () => initWithdraw(),
    cancelWithdraw: () => cancelWithdraw(),
    withdraw: () => withdraw(),
  };
};
