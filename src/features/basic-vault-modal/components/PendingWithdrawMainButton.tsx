import { useCallback } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

import { ActionMainButton } from "../../modal/components/ActionMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import { numberFormatter } from "../../shared/helpers";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { TabType } from "../types";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";

// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
export const PendingWithdrawMainButton = () => {
  const {
    walletChainId,
    basicVaultChainId,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { tabType, tokenData } = useBasicModalState();
  const {
    cancelWithdrawMutation,
    withdrawMutation,
    runCancelWithdraw,
    runWithdraw,
  } = useBasicModalMutations();

  const { account } = useWallet();

  const handleResetButtonClick = useCallback(() => {
    const mutations = [cancelWithdrawMutation, withdrawMutation];

    mutations.forEach((mutation) => {
      if (mutation) {
        mutation.reset();
      }
    });
  }, [cancelWithdrawMutation, withdrawMutation]);

  const {
    isLoading: isCancelWithdrawLoading,
    isError: isCancelWithdrawError,
    error: cancelWithdrawError,
  } = cancelWithdrawMutation ?? {};

  const {
    isLoading: isWithdrawLoading,
    isError: isWithdrawError,
    error: withdrawError,
  } = withdrawMutation ?? {};

  const isError = Boolean(isCancelWithdrawError) || Boolean(isWithdrawError);
  const error = cancelWithdrawError ?? withdrawError;

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData } = basicVaultReaderQuery;

  const { epoch = 0 } = basicVaultData ?? {};
  const { withdrawalPending = null, queuedExitEpoch = null } =
    basicVaultReaderData ?? {};

  const isShow =
    account &&
    walletChainId === basicVaultChainId &&
    !isBasicVaultLoading &&
    tokenData &&
    tabType === TabType.withdraw &&
    withdrawalPending &&
    withdrawalPending.gt(0);

  if (!isShow) {
    return null;
  }

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
  }

  if (isCancelWithdrawLoading) {
    return <LoadingMainButton>Canceling...</LoadingMainButton>;
  }

  if (isWithdrawLoading) {
    return <LoadingMainButton>Claiming...</LoadingMainButton>;
  }

  if (queuedExitEpoch && epoch > queuedExitEpoch) {
    const formattedWithdrawalPending = numberFormatter.format(
      withdrawalPending.toNumber()
    );

    return (
      <ActionMainButton
        onClick={runWithdraw}
      >{`Claim ${formattedWithdrawalPending} ${tokenData.symbol}`}</ActionMainButton>
    );
  }

  return (
    <ModalMainButton
      onClick={runCancelWithdraw}
      primaryColor="#EB5853"
      secondaryColor="#ffffff"
    >
      Cancel Pending Withdrawal
    </ModalMainButton>
  );
};
