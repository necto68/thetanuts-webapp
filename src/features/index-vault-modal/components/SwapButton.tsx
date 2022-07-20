import { useWallet } from "@gimmixorg/use-wallet";
import type { FC } from "react";
import { useCallback, useState } from "react";
import Big from "big.js";

import { LoadingSpinner } from "../../shared/components";
import { web3ModalConfig } from "../../wallet/constants";
import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useSwapRouterMutations,
  useSwapRouterState,
  useWithdrawDataQuery,
} from "../hooks";
import { ModalContentType } from "../types";
import type { NativeToken, Token } from "../types";

import { BaseSwapButton, ContentContainer } from "./SwapButton.styles";

interface SwapButtonProps {
  isSourceValueLoading: boolean;
  isTargetValueLoading: boolean;
  sourceTokenData: NativeToken | Token | undefined;
  targetTokenData: NativeToken | Token | undefined;
}

// eslint-disable-next-line complexity
export const SwapButton: FC<SwapButtonProps> = ({
  isSourceValueLoading,
  isTargetValueLoading,
  sourceTokenData,
  targetTokenData,
}) => {
  const [indexVaultModalState, setIndexVaultModalState] =
    useIndexVaultModalState();
  const {
    isUserOnSupportedChainId,
    isUserOnMainChainId,
    supportedChainIds,
    indexVaultQuery,
  } = useSwapRouterConfig();
  const {
    sourceValue,
    targetValue,
    isUseDirectMode,
    isFlipped,
    isDirectModeBetterThanSwapMode,
  } = useSwapRouterState();
  const {
    approveAllowanceMutation,
    swapMutation,
    runApproveAllowance,
    runSwapTokensForTokens,
    runDirectDeposit,
    runDirectWithdraw,
    runClaim,
  } = useSwapRouterMutations();

  const { data: withdrawData } = useWithdrawDataQuery();

  const { claimableBalance = "", fullyClaimed = false } = withdrawData ?? {};

  const { account, connect } = useWallet();

  const [isDirectModeBetterIgnore, setIsDirectModeBetterIgnore] =
    useState(false);

  const handleConnectWalletButtonClick = useCallback(async () => {
    await connect(web3ModalConfig);
  }, [connect]);

  const handleResetButtonClick = useCallback(() => {
    if (approveAllowanceMutation) {
      approveAllowanceMutation.reset();
    }

    if (swapMutation) {
      swapMutation.reset();
    }
  }, [approveAllowanceMutation, swapMutation]);

  const handleApproveButtonClick = useCallback(() => {
    runApproveAllowance();
  }, [runApproveAllowance]);

  const handleModeBetterIgnoreClick = useCallback(() => {
    setIsDirectModeBetterIgnore(!isDirectModeBetterIgnore);
  }, [isDirectModeBetterIgnore]);

  const handleSwapButtonClick = useCallback(() => {
    if (indexVaultModalState.contentType === ModalContentType.withdrawSummary) {
      runDirectWithdraw();
      return;
    }

    if (indexVaultModalState.contentType === ModalContentType.withdrawClaim) {
      runClaim();
      return;
    }

    if (isUseDirectMode) {
      runDirectDeposit();
      return;
    }

    runSwapTokensForTokens();
  }, [
    isUseDirectMode,
    runDirectDeposit,
    runSwapTokensForTokens,
    indexVaultModalState.contentType,
    runClaim,
    runDirectWithdraw,
  ]);

  const handleDirectWithdrawButtonClick = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      contentType: ModalContentType.withdrawSummary,
    }));
  }, [setIndexVaultModalState]);

  const { data } = indexVaultQuery;
  const { totalRemainder = Number.MAX_SAFE_INTEGER } = data ?? {};

  const sourceValueBig = new Big(sourceValue || 0);
  const targetValueBig = new Big(targetValue || 0);

  const isSwapButtonDisabled =
    isSourceValueLoading ||
    isTargetValueLoading ||
    !sourceTokenData ||
    !targetTokenData ||
    sourceValueBig.lte(0) ||
    targetValueBig.lte(0);

  const isNeedApprove =
    sourceTokenData?.allowance &&
    sourceValueBig.gt(0) &&
    sourceValueBig.gt(sourceTokenData.allowance);

  const {
    isLoading: isApproveAllowanceLoading,
    isError: isApproveAllowanceError,
    error: approveAllowanceError,
  } = approveAllowanceMutation ?? {};

  const {
    isLoading: isSwapLoading,
    isError: isSwapError,
    error: swapError,
  } = swapMutation ?? {};

  const isError = Boolean(isApproveAllowanceError) || Boolean(isSwapError);

  const error = approveAllowanceError ?? swapError;

  if (!account) {
    return (
      <BaseSwapButton
        onClick={handleConnectWalletButtonClick}
        primaryColor="#259DDF"
        secondaryColor="#ffffff"
      >
        Connect Wallet
      </BaseSwapButton>
    );
  }

  if (!isUserOnSupportedChainId && supportedChainIds.length > 0) {
    return (
      <BaseSwapButton disabled primaryColor="#EB5853" secondaryColor="#ffffff">
        Wrong Network
      </BaseSwapButton>
    );
  }

  if (
    !isUserOnMainChainId &&
    indexVaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return (
      <BaseSwapButton disabled primaryColor="#EB5853" secondaryColor="#ffffff">
        Wrong Network
      </BaseSwapButton>
    );
  }

  if (isError && error) {
    return (
      <BaseSwapButton
        onClick={handleResetButtonClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        {error.data?.message ?? error.message}
      </BaseSwapButton>
    );
  }

  if (
    isSwapLoading &&
    indexVaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return (
      <BaseSwapButton disabled primaryColor="#12CC86" secondaryColor="#ffffff">
        <ContentContainer>
          Receiving...
          <LoadingSpinner />
        </ContentContainer>
      </BaseSwapButton>
    );
  }

  if (
    fullyClaimed &&
    indexVaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return <BaseSwapButton disabled>All assets claimed</BaseSwapButton>;
  }

  if (
    Number(claimableBalance) <= 0 &&
    indexVaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return <BaseSwapButton disabled>Nothing to claim yet</BaseSwapButton>;
  }

  if (indexVaultModalState.contentType === ModalContentType.withdrawClaim) {
    return (
      <BaseSwapButton
        onClick={handleSwapButtonClick}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        Claim {claimableBalance} {targetTokenData?.symbol}
      </BaseSwapButton>
    );
  }

  if (
    sourceTokenData?.balance &&
    sourceValueBig.gt(0) &&
    sourceValueBig.gt(sourceTokenData.balance)
  ) {
    return (
      <BaseSwapButton disabled primaryColor="#EB5853" secondaryColor="#ffffff">
        Insufficient Balance
      </BaseSwapButton>
    );
  }

  if (!isFlipped && sourceValueBig.gt(totalRemainder)) {
    return (
      <BaseSwapButton disabled primaryColor="#EB5853" secondaryColor="#ffffff">
        Max Vault Cap Reached
      </BaseSwapButton>
    );
  }

  if (isApproveAllowanceLoading && sourceTokenData) {
    return (
      <BaseSwapButton disabled primaryColor="#12CC86" secondaryColor="#ffffff">
        <ContentContainer>
          {`Approving ${sourceTokenData.symbol}...`}
          <LoadingSpinner />
        </ContentContainer>
      </BaseSwapButton>
    );
  }

  if (
    indexVaultModalState.contentType === ModalContentType.withdraw &&
    (isSwapButtonDisabled || !isDirectModeBetterThanSwapMode)
  ) {
    return <BaseSwapButton disabled>Direct Withdraw</BaseSwapButton>;
  }

  if (
    isNeedApprove &&
    indexVaultModalState.contentType === ModalContentType.withdraw
  ) {
    return (
      <BaseSwapButton
        onClick={handleApproveButtonClick}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        Approve Direct Withdraw
      </BaseSwapButton>
    );
  }

  if (
    isSwapLoading &&
    indexVaultModalState.contentType === ModalContentType.withdrawSummary
  ) {
    return (
      <BaseSwapButton disabled primaryColor="#12CC86" secondaryColor="#ffffff">
        <ContentContainer>
          Withdrawing...
          <LoadingSpinner />
        </ContentContainer>
      </BaseSwapButton>
    );
  }

  if (indexVaultModalState.contentType === ModalContentType.withdrawSummary) {
    return (
      <BaseSwapButton
        onClick={handleSwapButtonClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        Confirm Direct Withdraw?
      </BaseSwapButton>
    );
  }

  if (indexVaultModalState.contentType === ModalContentType.withdraw) {
    return (
      <BaseSwapButton
        onClick={handleDirectWithdrawButtonClick}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        Direct Withdraw
      </BaseSwapButton>
    );
  }

  if (
    indexVaultModalState.contentType === ModalContentType.swap &&
    isDirectModeBetterThanSwapMode &&
    !isUseDirectMode &&
    !isDirectModeBetterIgnore
  ) {
    return (
      <BaseSwapButton
        onClick={handleModeBetterIgnoreClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        Swap Anyway
      </BaseSwapButton>
    );
  }

  if (isNeedApprove && isUseDirectMode) {
    return (
      <BaseSwapButton
        onClick={handleApproveButtonClick}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        {`Approve ${sourceTokenData.symbol} for Direct Deposit`}
      </BaseSwapButton>
    );
  }

  if (isNeedApprove) {
    return (
      <BaseSwapButton
        onClick={handleApproveButtonClick}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        {`Approve ${sourceTokenData.symbol} for Swap`}
      </BaseSwapButton>
    );
  }

  if (isSwapLoading) {
    return (
      <BaseSwapButton disabled primaryColor="#12CC86" secondaryColor="#ffffff">
        <ContentContainer>
          Swapping...
          <LoadingSpinner />
        </ContentContainer>
      </BaseSwapButton>
    );
  }

  if (isSwapButtonDisabled) {
    return <BaseSwapButton disabled>Swap</BaseSwapButton>;
  }

  if (isUseDirectMode) {
    return (
      <BaseSwapButton
        onClick={handleSwapButtonClick}
        primaryColor="#12CC86"
        secondaryColor="#ffffff"
      >
        Direct Deposit
      </BaseSwapButton>
    );
  }

  if (
    indexVaultModalState.contentType === ModalContentType.swap &&
    isDirectModeBetterThanSwapMode
  ) {
    return (
      <BaseSwapButton
        onClick={handleSwapButtonClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        Confirm Swap
      </BaseSwapButton>
    );
  }

  return (
    <BaseSwapButton
      onClick={handleSwapButtonClick}
      primaryColor="#12CC86"
      secondaryColor="#ffffff"
    >
      Swap
    </BaseSwapButton>
  );
};
