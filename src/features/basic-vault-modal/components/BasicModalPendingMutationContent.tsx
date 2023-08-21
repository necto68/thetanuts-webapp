import { useEffect, useState } from "react";

import { PendingMutationContent } from "../../modal/components/PendingMutationContent";
import { numberFormatter } from "../../shared/helpers";
import {
  useBasicModalConfig,
  useBasicModalState,
  useBasicModalMutations,
} from "../hooks";

// eslint-disable-next-line complexity
export const BasicModalPendingMutationContent = () => {
  const { basicVaultChainId, basicVaultReaderQuery } = useBasicModalConfig();
  const { inputValue, tokenData } = useBasicModalState();
  const {
    directDepositMutation,
    depositAndQueueMutation,
    withdrawMutation,
    mutationHash = "",
  } = useBasicModalMutations();

  const { withdrawalPending: rawWithdrawalPending } =
    basicVaultReaderQuery.data ?? {};

  const [withdrawalPending, setWithdrawalPending] =
    useState(rawWithdrawalPending);

  // we need to avoid the case where the user has already withdrawn the funds
  // and withdrawalPending === 0,
  // so we need to show previous value

  useEffect(() => {
    if (rawWithdrawalPending?.gt(0)) {
      setWithdrawalPending(rawWithdrawalPending);
    }
  }, [rawWithdrawalPending]);

  const formattedWithdrawalPending = withdrawalPending
    ? numberFormatter.format(withdrawalPending.toNumber())
    : "";

  const { data: directDepositData, isLoading: isDirectDepositLoading } =
    directDepositMutation ?? {};
  const { data: depositAndQueueData, isLoading: isDepositAndQueueLoading } =
    depositAndQueueMutation ?? {};
  const { data: withdrawData } = withdrawMutation ?? {};

  const isDirectDepositMutation =
    Boolean(directDepositData) || Boolean(isDirectDepositLoading);
  const isDepositAndQueueMutation =
    Boolean(depositAndQueueData) || Boolean(isDepositAndQueueLoading);
  const isDepositMutation =
    isDirectDepositMutation || isDepositAndQueueMutation;

  const isMutationSucceed =
    Boolean(directDepositData) ||
    Boolean(depositAndQueueData) ||
    Boolean(withdrawData);

  const sourceTokenData = {
    value: isDepositMutation ? inputValue : formattedWithdrawalPending,
    symbol: tokenData?.symbol ?? "",
  };

  const pendingTitle = isDepositMutation ? "Depositing... " : "Withdrawing... ";
  const successTitle = isDepositMutation
    ? "Successfully Deposited "
    : "Withdraw Successful ";

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
