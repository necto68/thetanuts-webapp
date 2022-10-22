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
import { useLendingMarketModalMutations } from "../../lending-market-vault-modal/hooks";
import { BasicVaultType } from "../../basic/types";

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
  const { openPositionMutation, runOpenPosition } =
    useLendingMarketModalMutations();

  const { account } = useWallet();

  const { data, isLoading: isBasicVaultQueryLoading } = basicVaultQuery;
  const { basicVaultType = BasicVaultType.BASIC } = data ?? {};

  const isLendingMarketBasicVault =
    basicVaultType === BasicVaultType.LENDING_MARKET;

  const handleResetButtonClick = useCallback(() => {
    const mutations = [
      approveAllowanceMutation,
      wrapMutation,
      depositMutation,
      openPositionMutation,
    ];

    resetMutations(mutations);
  }, [
    approveAllowanceMutation,
    wrapMutation,
    depositMutation,
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
    isLoading: isOpenPositionLoading,
    isError: isOpenPositionError,
    error: openPositionError,
  } = openPositionMutation ?? {};

  const isError =
    Boolean(isApproveAllowanceError) ||
    Boolean(isWrapError) ||
    Boolean(isDepositError) ||
    Boolean(isOpenPositionError);

  const error =
    approveAllowanceError ?? wrapError ?? depositError ?? openPositionError;

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

  if (isApproveAllowanceLoading && currentTokenData) {
    return (
      <LoadingMainButton>{`Approving ${currentTokenData.symbol}...`}</LoadingMainButton>
    );
  }

  if (isNeedApprove) {
    const title = isLendingMarketBasicVault
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
  } else if (isLendingMarketBasicVault) {
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
