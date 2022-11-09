import { useWallet } from "@gimmixorg/use-wallet";
import { useCallback } from "react";
import Big from "big.js";

import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import {
  useBasicModalConfig,
  useBasicModalState,
  useBasicModalMutations,
} from "../hooks";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";
import { resetMutations } from "../helpers";
import {
  useLongModalConfig,
  useLongModalMutations,
} from "../../long-vault-modal/hooks";
import { BasicVaultType } from "../../basic/types";

import { SwitchToChainIdMainButton } from "./SwitchToChainIdMainButton";

// eslint-disable-next-line complexity
export const DepositMainButton = () => {
  const { walletChainId, walletProvider, basicVaultChainId, basicVaultQuery } =
    useBasicModalConfig();
  const { longVaultReaderQuery } = useLongModalConfig();
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
  const {
    approveDelegationMutation,
    openPositionMutation,
    runApproveDelegation,
    runOpenPosition,
  } = useLongModalMutations();

  const { account } = useWallet();

  const { data, isLoading: isBasicVaultQueryLoading } = basicVaultQuery;
  const { basicVaultType = BasicVaultType.BASIC } = data ?? {};

  const { data: longVaultReaderData } = longVaultReaderQuery;
  const { borrowAllowance } = longVaultReaderData ?? {};

  const isLongVault = basicVaultType === BasicVaultType.LONG;

  const handleResetButtonClick = useCallback(() => {
    const mutations = [
      approveAllowanceMutation,
      wrapMutation,
      depositMutation,
      approveDelegationMutation,
      openPositionMutation,
    ];

    resetMutations(mutations);
  }, [
    approveAllowanceMutation,
    wrapMutation,
    depositMutation,
    approveDelegationMutation,
    openPositionMutation,
  ]);

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

  const {
    isLoading: isApproveDelegationLoading,
    isError: isApproveDelegationError,
    error: approveDelegationError,
  } = approveDelegationMutation ?? {};

  const {
    isLoading: isOpenPositionLoading,
    isError: isOpenPositionError,
    error: openPositionError,
  } = openPositionMutation ?? {};

  const isError =
    Boolean(isApproveAllowanceError) ||
    Boolean(isWrapError) ||
    Boolean(isDepositError) ||
    Boolean(isApproveDelegationError) ||
    Boolean(isOpenPositionError);

  const error =
    approveAllowanceError ??
    wrapError ??
    depositError ??
    approveDelegationError ??
    openPositionError;

  const inputValueBig = new Big(inputValue || 0);

  const currentTokenData = isUseNativeData ? nativeData : tokenData;

  const isNeedApprove =
    currentTokenData?.allowance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(currentTokenData.allowance);

  const isNeedLongVaultDelegationApprove =
    isLongVault &&
    borrowAllowance &&
    inputValueBig.gt(0) &&
    inputValueBig.gt(borrowAllowance);

  const isApproveLoading =
    Boolean(isApproveAllowanceLoading) || Boolean(isApproveDelegationLoading);

  const isMainButtonDisabled =
    isTokenDataLoading || !currentTokenData || inputValueBig.lte(0);

  if (!account) {
    return <ConnectWalletMainButton />;
  }

  if (!isBasicVaultQueryLoading && walletChainId !== basicVaultChainId) {
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

  if (isApproveLoading && currentTokenData) {
    return (
      <LoadingMainButton>{`Approving ${currentTokenData.symbol}...`}</LoadingMainButton>
    );
  }

  if (isNeedLongVaultDelegationApprove) {
    return (
      <ActionMainButton onClick={runApproveDelegation}>
        Approve Delegation
      </ActionMainButton>
    );
  }

  if (isNeedApprove) {
    const title = isLongVault
      ? `Approve ${currentTokenData.symbol} for Open Position`
      : `Approve ${currentTokenData.symbol} for Deposit`;

    return (
      <ActionMainButton onClick={runApproveAllowance}>{title}</ActionMainButton>
    );
  }

  if (isWrapLoading) {
    return <LoadingMainButton>Wrapping...</LoadingMainButton>;
  }

  if (isDepositLoading) {
    return <LoadingMainButton>Depositing...</LoadingMainButton>;
  }

  if (isOpenPositionLoading) {
    return <LoadingMainButton>Opening Position...</LoadingMainButton>;
  }

  let buttonTitle = "";
  let handleMainButtonClick = null;

  if (isUseNativeData) {
    buttonTitle = currentTokenData
      ? `Wrap ${currentTokenData.symbol} to W${currentTokenData.symbol}`
      : "Wrap";

    handleMainButtonClick = runWrap;
  } else if (isLongVault) {
    buttonTitle = "Open Position";
    handleMainButtonClick = runOpenPosition;
  } else {
    buttonTitle = "Initiate Deposit";
    handleMainButtonClick = runDeposit;
  }

  return isMainButtonDisabled ? (
    <ModalMainButton disabled>{buttonTitle}</ModalMainButton>
  ) : (
    <ModalMainButton
      onClick={handleMainButtonClick}
      primaryColor="#12CC86"
      secondaryColor="#ffffff"
    >
      {buttonTitle}
    </ModalMainButton>
  );
};
