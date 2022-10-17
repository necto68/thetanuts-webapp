import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";
import Big from "big.js";

import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import { useBasicModalMutations, useBasicModalState } from "../hooks";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";
import { resetMutations } from "../helpers";

import { SwitchToChainIdMainButton } from "./SwitchToChainIdMainButton";

// eslint-disable-next-line complexity
export const DepositMainButton = () => {
  const { walletChainId, walletProvider, basicVaultChainId, basicVaultQuery } =
    useBasicModalConfig();
  const {
    inputValue,
    tokenData,
    isTokenDataLoading,
    nativeData,
    isUseNativeData,
    remainderValue,
  } = useBasicModalState();
  const {
    approveAllowanceMutation,
    wrapMutation,
    depositMutation,
    runApproveAllowance,
    runWrap,
    runDeposit,
  } = useBasicModalMutations();

  const { account } = useWallet();

  const handleResetButtonClick = useCallback(() => {
    const mutations = [approveAllowanceMutation, wrapMutation, depositMutation];

    resetMutations(mutations);
  }, [approveAllowanceMutation, wrapMutation, depositMutation]);

  const {
    isLoading: isApproveAllowanceLoading,
    isError: isApproveAllowanceError,
    error: approveAllowanceError,
  } = approveAllowanceMutation ?? {};

  const {
    isLoading: isWrapLoading,
    isError: isWrapError,
    error: wrapError,
  } = wrapMutation ?? {};

  const {
    isLoading: isDepositLoading,
    isError: isDepositError,
    error: depositError,
  } = depositMutation ?? {};

  const isError =
    Boolean(isApproveAllowanceError) ||
    Boolean(isWrapError) ||
    Boolean(isDepositError);

  const error = approveAllowanceError ?? wrapError ?? depositError;

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  const isNeedApprove =
    currentTokenData?.allowance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(currentTokenData.allowance);

  const isMainButtonDisabled =
    isTokenDataLoading || !currentTokenData || inputValueBig.lte(0);

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
    currentTokenData?.balance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(currentTokenData.balance)
  ) {
    return <InsufficientBalanceMainButton />;
  }

  if (remainderValue && inputValueBig.gt(remainderValue)) {
    return <MaxVaultCapReachedMainButton />;
  }

  if (isApproveAllowanceLoading && currentTokenData) {
    return (
      <LoadingMainButton>{`Approving ${currentTokenData.symbol}...`}</LoadingMainButton>
    );
  }

  if (isNeedApprove) {
    return (
      <ActionMainButton onClick={runApproveAllowance}>
        {`Approve ${currentTokenData.symbol} for Deposit`}
      </ActionMainButton>
    );
  }

  if (isWrapLoading) {
    return <LoadingMainButton>Wrapping...</LoadingMainButton>;
  }

  if (isDepositLoading) {
    return <LoadingMainButton>Depositing...</LoadingMainButton>;
  }

  if (isUseNativeData) {
    const buttonTitle = currentTokenData
      ? `Wrap ${currentTokenData.symbol} to W${currentTokenData.symbol}`
      : "Wrap";

    return isMainButtonDisabled ? (
      <ModalMainButton disabled>{buttonTitle}</ModalMainButton>
    ) : (
      <ModalMainButton
        onClick={runWrap}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        {buttonTitle}
      </ModalMainButton>
    );
  }

  return isMainButtonDisabled ? (
    <ModalMainButton disabled>Initiate Deposit</ModalMainButton>
  ) : (
    <ModalMainButton
      onClick={runDeposit}
      primaryColor="#12CC86"
      secondaryColor="#ffffff"
    >
      Initiate Deposit
    </ModalMainButton>
  );
};
