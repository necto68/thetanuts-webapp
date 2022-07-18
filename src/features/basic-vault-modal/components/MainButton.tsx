import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";
import Big from "big.js";

import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { TabType } from "../types";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";

import { SwitchToChainIdMainButton } from "./SwitchToChainIdMainButton";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const MainButton = () => {
  const { walletChainId, walletProvider, basicVaultChainId, basicVaultQuery } =
    useBasicModalConfig();
  const { tabType, inputValue, tokenData, isTokenDataLoading, remainderValue } =
    useBasicModalState();
  const {
    approveAllowanceMutation,
    depositMutation,
    initWithdrawMutation,
    runApproveAllowance,
    runDeposit,
    runInitWithdraw,
  } = useBasicModalMutations();

  const { account } = useWallet();

  const handleApproveButtonClick = useCallback(() => {
    runApproveAllowance();
  }, [runApproveAllowance]);

  const handleResetButtonClick = useCallback(() => {
    const mutations = [
      approveAllowanceMutation,
      depositMutation,
      initWithdrawMutation,
    ];

    mutations.forEach((mutation) => {
      if (mutation) {
        mutation.reset();
      }
    });
  }, [approveAllowanceMutation, depositMutation, initWithdrawMutation]);

  const {
    isLoading: isApproveAllowanceLoading,
    isError: isApproveAllowanceError,
    error: approveAllowanceError,
  } = approveAllowanceMutation ?? {};

  const {
    isLoading: isDepositLoading,
    isError: isDepositError,
    error: depositError,
  } = depositMutation ?? {};

  const {
    isLoading: isInitWithdrawLoading,
    isError: isInitWithdrawError,
    error: initWithdrawError,
  } = initWithdrawMutation ?? {};

  const isError =
    Boolean(isApproveAllowanceError) ||
    Boolean(isDepositError) ||
    Boolean(isInitWithdrawError);
  const error = approveAllowanceError ?? depositError ?? initWithdrawError;

  const inputValueBig = new Big(inputValue || 0);

  const isNeedApprove =
    tokenData?.allowance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(tokenData.allowance);

  const isMainButtonDisabled =
    isTokenDataLoading || !tokenData || inputValueBig.lte(0);

  if (!account) {
    return <ConnectWalletMainButton />;
  }

  if (!basicVaultQuery.isLoading && walletChainId !== basicVaultChainId) {
    return (
      <SwitchToChainIdMainButton
        chainId={basicVaultChainId}
        provider={walletProvider}
      />
    );
  }

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
  }

  if (
    tokenData?.balance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(tokenData.balance)
  ) {
    return <InsufficientBalanceMainButton />;
  }

  if (remainderValue && inputValueBig.gt(remainderValue)) {
    return <MaxVaultCapReachedMainButton />;
  }

  if (isApproveAllowanceLoading && tokenData) {
    return (
      <LoadingMainButton>{`Approving ${tokenData.symbol}...`}</LoadingMainButton>
    );
  }

  if (tabType === TabType.deposit && isNeedApprove) {
    return (
      <ActionMainButton onClick={handleApproveButtonClick}>
        {`Approve ${tokenData.symbol} for Deposit`}
      </ActionMainButton>
    );
  }

  if (tabType === TabType.deposit && isDepositLoading) {
    return <LoadingMainButton>Depositing...</LoadingMainButton>;
  }

  if (tabType === TabType.withdraw && isInitWithdrawLoading) {
    return <LoadingMainButton>Initiating Withdraw...</LoadingMainButton>;
  }

  if (isMainButtonDisabled) {
    return tabType === TabType.deposit ? (
      <ModalMainButton disabled>Deposit</ModalMainButton>
    ) : (
      <ModalMainButton disabled>Initiate Withdraw</ModalMainButton>
    );
  }

  if (tabType === TabType.deposit) {
    return (
      <ModalMainButton
        onClick={runDeposit}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        Deposit
      </ModalMainButton>
    );
  }

  return (
    <ModalMainButton
      onClick={runInitWithdraw}
      primaryColor="#12CC86"
      secondaryColor="#ffffff"
    >
      Initiate Withdraw
    </ModalMainButton>
  );
};
