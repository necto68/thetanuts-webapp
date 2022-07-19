import { PendingMutationContent } from "../../modal/components/PendingMutationContent";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";

export const BasicModalPendingMutationContent = () => {
  const { basicVaultChainId } = useBasicModalConfig();
  const { inputValue, tokenData } = useBasicModalState();
  const {
    depositMutation,
    withdrawMutation,
    mutationHash = "",
  } = useBasicModalMutations();

  const { data: depositData, isLoading: isDepositLoading } =
    depositMutation ?? {};

  const { data: withdrawData } = withdrawMutation ?? {};

  const isMutationSucceed = Boolean(depositData) || Boolean(withdrawData);

  const sourceTokenData = {
    value: inputValue,
    symbol: tokenData?.symbol ?? "",
  };

  const pendingTitle = isDepositLoading ? "Depositing..." : "Withdrawing...";
  const successTitle = depositData
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
