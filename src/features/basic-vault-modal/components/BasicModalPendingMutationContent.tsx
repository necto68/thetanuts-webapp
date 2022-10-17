import { useEffect, useState } from "react";

import { PendingMutationContent } from "../../modal/components/PendingMutationContent";
import { numberFormatter } from "../../shared/helpers";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";

// eslint-disable-next-line complexity
export const BasicModalPendingMutationContent = () => {
  const { basicVaultChainId, basicVaultReaderQuery } = useBasicModalConfig();
  const { inputValue, tokenData } = useBasicModalState();
  const {
    depositMutation,
    withdrawMutation,
    mutationHash = "",
  } = useBasicModalMutations();

  const { withdrawalPending: rawWithdrawalPending } =
    basicVaultReaderQuery.data ?? {};

  const [withdrawalPending, setWithdrawalPending] =
    useState(rawWithdrawalPending);

  // we need to avoid the case where the user has already withdrawn the funds
  // and withdrawalPending === 0
  // so we need to show previous value

  useEffect(() => {
    if (rawWithdrawalPending?.gt(0)) {
      setWithdrawalPending(rawWithdrawalPending);
    }
  }, [rawWithdrawalPending]);

  const formattedWithdrawalPending = withdrawalPending
    ? numberFormatter.format(withdrawalPending.toNumber())
    : "";

  const { data: depositData, isLoading: isDepositLoading } =
    depositMutation ?? {};
  const { data: withdrawData } = withdrawMutation ?? {};

  const isDepositMutation = Boolean(depositData) || isDepositLoading;

  const isMutationSucceed = Boolean(depositData) || Boolean(withdrawData);

  const sourceTokenData = {
    value: isDepositMutation ? inputValue : formattedWithdrawalPending,
    symbol: tokenData?.symbol ?? "",
  };

  const pendingTitle = isDepositMutation ? "Depositing..." : "Withdrawing...";
  const successTitle = isDepositMutation
    ? "Deposit Successful"
    : "Withdraw Successful";

  return (
    <PendingMutationContent
      chainId={basicVaultChainId}
      isMutationSucceed={isMutationSucceed}
      mutationHash={mutationHash}
      pendingTitle={pendingTitle}
      sourceTokenData={sourceTokenData}
      successTitle={successTitle}
    />
  );
};
