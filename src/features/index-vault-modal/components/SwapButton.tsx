import type { FC } from "react";
import { useCallback, useState } from "react";
import Big from "big.js";

import { useWallet } from "../../wallet/hooks/useWallet";
import {
  useSwapRouterConfig,
  useSwapRouterMutations,
  useSwapRouterState,
  useWithdrawDataQuery,
} from "../hooks";
import { ModalContentType } from "../types";
import type { NativeToken, Token } from "../types";
import { ModalMainButton } from "../../modal/components/ModalMainButton.styles";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";
import { useVaultModalState } from "../../modal/hooks";

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
  const [vaultModalState, setVaultModalState] = useVaultModalState();

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

  const { wallet } = useWallet();

  const [isDirectModeBetterIgnore, setIsDirectModeBetterIgnore] =
    useState(false);

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
    if (vaultModalState.contentType === ModalContentType.withdrawSummary) {
      runDirectWithdraw();
      return;
    }

    if (vaultModalState.contentType === ModalContentType.withdrawClaim) {
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
    vaultModalState.contentType,
    runClaim,
    runDirectWithdraw,
  ]);

  const handleDirectWithdrawButtonClick = useCallback(() => {
    setVaultModalState((previousState) => ({
      ...previousState,
      contentType: ModalContentType.withdrawSummary,
    }));
  }, [setVaultModalState]);

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

  if (!wallet) {
    return <ConnectWalletMainButton />;
  }

  if (!isUserOnSupportedChainId && supportedChainIds.length > 0) {
    return (
      <ModalMainButton disabled primaryColor="#EB5853" secondaryColor="#ffffff">
        Wrong Network
      </ModalMainButton>
    );
  }

  if (
    !isUserOnMainChainId &&
    vaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return (
      <ModalMainButton disabled primaryColor="#EB5853" secondaryColor="#ffffff">
        Wrong Network
      </ModalMainButton>
    );
  }

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
  }

  if (
    isSwapLoading &&
    vaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return <LoadingMainButton>Receiving...</LoadingMainButton>;
  }

  if (
    fullyClaimed &&
    vaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return <ModalMainButton disabled>All assets claimed</ModalMainButton>;
  }

  if (
    Number(claimableBalance) <= 0 &&
    vaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return <ModalMainButton disabled>Nothing to claim yet</ModalMainButton>;
  }

  if (vaultModalState.contentType === ModalContentType.withdrawClaim) {
    return (
      <ActionMainButton onClick={handleSwapButtonClick}>
        Claim {claimableBalance} {targetTokenData?.symbol}
      </ActionMainButton>
    );
  }

  if (
    sourceTokenData?.balance &&
    sourceValueBig.gt(0) &&
    sourceValueBig.gt(sourceTokenData.balance)
  ) {
    return <InsufficientBalanceMainButton />;
  }

  if (!isFlipped && sourceValueBig.gt(totalRemainder)) {
    return <MaxVaultCapReachedMainButton />;
  }

  if (isApproveAllowanceLoading && sourceTokenData) {
    return (
      <LoadingMainButton>{`Approving ${sourceTokenData.symbol}...`}</LoadingMainButton>
    );
  }

  if (
    vaultModalState.contentType === ModalContentType.withdraw &&
    (isSwapButtonDisabled || !isDirectModeBetterThanSwapMode)
  ) {
    return <ModalMainButton disabled>Direct Withdraw</ModalMainButton>;
  }

  if (
    isNeedApprove &&
    vaultModalState.contentType === ModalContentType.withdraw
  ) {
    return (
      <ActionMainButton onClick={handleApproveButtonClick}>
        Approve Direct Withdraw
      </ActionMainButton>
    );
  }

  if (
    isSwapLoading &&
    vaultModalState.contentType === ModalContentType.withdrawSummary
  ) {
    return <LoadingMainButton>Withdrawing...</LoadingMainButton>;
  }

  if (vaultModalState.contentType === ModalContentType.withdrawSummary) {
    return (
      <ModalMainButton
        onClick={handleSwapButtonClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        Confirm Direct Withdraw?
      </ModalMainButton>
    );
  }

  if (vaultModalState.contentType === ModalContentType.withdraw) {
    return (
      <ActionMainButton onClick={handleDirectWithdrawButtonClick}>
        Direct Withdraw
      </ActionMainButton>
    );
  }

  if (
    vaultModalState.contentType === ModalContentType.swap &&
    isDirectModeBetterThanSwapMode &&
    !isUseDirectMode &&
    !isDirectModeBetterIgnore
  ) {
    return (
      <ModalMainButton
        onClick={handleModeBetterIgnoreClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        Swap Anyway
      </ModalMainButton>
    );
  }

  if (isNeedApprove && isUseDirectMode) {
    return (
      <ActionMainButton onClick={handleApproveButtonClick}>
        {`Approve ${sourceTokenData.symbol} for Direct Deposit`}
      </ActionMainButton>
    );
  }

  if (isNeedApprove) {
    return (
      <ActionMainButton onClick={handleApproveButtonClick}>
        {`Approve ${sourceTokenData.symbol} for Swap`}
      </ActionMainButton>
    );
  }

  if (isSwapLoading) {
    return <LoadingMainButton>Swapping...</LoadingMainButton>;
  }

  if (isSwapButtonDisabled) {
    return <ModalMainButton disabled>Swap</ModalMainButton>;
  }

  if (isUseDirectMode) {
    return (
      <ActionMainButton onClick={handleSwapButtonClick}>
        Direct Deposit
      </ActionMainButton>
    );
  }

  if (
    vaultModalState.contentType === ModalContentType.swap &&
    isDirectModeBetterThanSwapMode
  ) {
    return (
      <ModalMainButton
        onClick={handleSwapButtonClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        Confirm Swap
      </ModalMainButton>
    );
  }

  return (
    <ActionMainButton onClick={handleSwapButtonClick}>Swap</ActionMainButton>
  );
};
