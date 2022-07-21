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

  const { withdrawalPending } = basicVaultReaderQuery.data ?? {};

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
