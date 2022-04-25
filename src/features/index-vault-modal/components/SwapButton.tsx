import { useWallet } from "@gimmixorg/use-wallet";
import type { FC } from "react";
import { useCallback } from "react";
import Big from "big.js";

import { LoadingSpinner } from "../../shared/components";
import { web3ModalConfig } from "../../wallet/constants";
import {
  useSwapRouterMutations,
  useSwapRouterConfig,
  useSwapRouterState,
} from "../hooks";
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
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { isUserOnSupportedChainId, supportedChainIds, indexVaultQuery } =
    useSwapRouterConfig();
  const { sourceValue, targetValue, isUseDirectMode, isFlipped } =
    useSwapRouterState();
  const {
    approveAllowanceMutation,
    swapMutation,
    runApproveAllowance,
    runSwapTokensForTokens,
    runDirectDeposit,
  } = useSwapRouterMutations();

  const { account, connect } = useWallet();

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

  const handleSwapButtonClick = useCallback(() => {
    if (isUseDirectMode) {
      runDirectDeposit();
    } else {
      runSwapTokensForTokens();
    }
  }, [isUseDirectMode, runDirectDeposit, runSwapTokensForTokens]);

  const { data } = indexVaultQuery;
  const { totalRemainder = Number.POSITIVE_INFINITY } = data ?? {};

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
