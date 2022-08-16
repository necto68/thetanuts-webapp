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
import { resetMutations } from "../helpers";

// eslint-disable-next-line complexity
export const PendingWithdrawMainButton = () => {
  const {
    walletChainId,
    basicVaultChainId,
    basicVaultQuery,
    basicVaultReaderQuery,
  } = useBasicModalConfig();
  const { tabType, tokenData } = useBasicModalState();
  const {
    initWithdrawMutation,
    cancelWithdrawMutation,
    withdrawMutation,
    runCancelWithdraw,
    runWithdraw,
  } = useBasicModalMutations();

  const { account } = useWallet();

  const handleResetButtonClick = useCallback(() => {
    const mutations = [cancelWithdrawMutation, withdrawMutation];

    resetMutations(mutations);
  }, [cancelWithdrawMutation, withdrawMutation]);

  const { isLoading: isInitWithdrawLoading } = initWithdrawMutation ?? {};

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

    const buttonTitle = `Claim ${formattedWithdrawalPending} ${tokenData.symbol}`;

    if (isInitWithdrawLoading) {
      return <ModalMainButton disabled>{buttonTitle}</ModalMainButton>;
    }

    return (
      <ActionMainButton onClick={runWithdraw}>{buttonTitle}</ActionMainButton>
    );
  }

  if (isInitWithdrawLoading) {
    return (
      <ModalMainButton disabled>Cancel Pending Withdrawal</ModalMainButton>
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
