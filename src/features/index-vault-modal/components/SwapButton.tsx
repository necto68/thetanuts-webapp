import { useWallet } from "@gimmixorg/use-wallet";
import type { FC } from "react";
import { useCallback, useState } from "react";
import Big from "big.js";

import {
  useIndexVaultModalState,
  useSwapRouterConfig,
  useSwapRouterMutations,
  useSwapRouterState,
  useWithdrawDataQuery,
} from "../hooks";
import { ModalContentType } from "../types";
import type { NativeToken, Token } from "../types";
import { ModalMainButton } from "../../modal/components/MainModalButton.styles";
import { ConnectWalletMainButton } from "../../modal/components/ConnectWalletMainButton";
import { InsufficientBalanceMainButton } from "../../modal/components/InsufficientBalanceMainButton";
import { MaxVaultCapReachedMainButton } from "../../modal/components/MaxVaultCapReachedMainButton";
import { LoadingMainButton } from "../../modal/components/LoadingMainButton";
import { ErrorMainButton } from "../../modal/components/ErrorMainButton";
import { ActionMainButton } from "../../modal/components/ActionMainButton";

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

  const { account } = useWallet();

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
    indexVaultModalState.contentType === ModalContentType.withdrawClaim
  ) {
    return (
      <BaseSwapButton disabled primaryColor="#EB5853" secondaryColor="#ffffff">
        Wrong Network
      </BaseSwapButton>
    );
  }

  if (isError && error) {
    return <ErrorMainButton error={error} onClick={handleResetButtonClick} />;
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
    <ActionMainButton onClick={handleSwapButtonClick}>Swap</ActionMainButton>
  );
};
