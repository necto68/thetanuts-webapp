import { useEffect, useState } from "react";

import { PendingMutationContent } from "../../modal/components/PendingMutationContent";
import { numberFormatter } from "../../shared/helpers";
import {
  useBasicModalConfig,
  useBasicModalState,
  useBasicModalMutations,
} from "../hooks";

// eslint-disable-next-line complexity
export const BoostModalPendingMutationContent = () => {
  const { basicVaultChainId, basicVaultReaderQuery } = useBasicModalConfig();
  const { inputValue, tokenData } = useBasicModalState();
  const {
    boostMutation,
    unboostMutation,
    boostHash = "",
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
  boostMutation ?? {};
  const { data: withdrawData } = unboostMutation ?? {};

  const isDepositMutation = Boolean(depositData) || isDepositLoading;

  const isMutationSucceed = Boolean(depositData) || Boolean(withdrawData);

  const sourceTokenData = {
    value: isDepositMutation ? Number(inputValue).toFixed(2)  : Number(inputValue).toFixed(2) ,
    symbol: tokenData?.symbol ?? "",
  };

  const pendingTitle = isDepositMutation ? "Boosting... " : "Unboosting... ";
  const successTitle = isDepositMutation
    ? "Successfully Boosted "
    : "Successfully Unboosted ";

  return (
    <PendingMutationContent
      chainId={basicVaultChainId}
      isMutationSucceed={isMutationSucceed}
      mutationHash={boostHash}
      pendingTitle={pendingTitle}
      sourceTokenData={sourceTokenData}
      successTitle={successTitle}
    />
  );
};
