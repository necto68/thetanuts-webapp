import { useWallet } from "@gimmixorg/use-wallet";
import type { FC } from "react";
import { useCallback } from "react";
import Big from "big.js";

import { web3ModalConfig } from "../../wallet/constants";
import type { useSwapRouterMutations } from "../hooks";
import { useSwapRouterConfig } from "../hooks";
import type { NativeToken, Token } from "../types";

import { BaseSwapButton } from "./SwapButton.styles";

interface SwapButtonProps {
  isSourceValueLoading: boolean;
  isTargetValueLoading: boolean;
  isUseDirectDepositMode: boolean;
  rootMutation: ReturnType<typeof useSwapRouterMutations>["rootMutation"];
  routerMutations: ReturnType<typeof useSwapRouterMutations>["routerMutations"];
  sourceTokenData: NativeToken | Token | undefined;
  sourceValue: string;
  targetTokenData: NativeToken | Token | undefined;
  targetValue: string;
}

// eslint-disable-next-line complexity
export const SwapButton: FC<SwapButtonProps> = ({
  isSourceValueLoading,
  isTargetValueLoading,
  isUseDirectDepositMode,
  rootMutation,
  routerMutations,
  sourceTokenData,
  sourceValue,
  targetTokenData,
  targetValue,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { isUserOnSupportedChainId, supportedChainIds } = useSwapRouterConfig();

  const { account, connect } = useWallet();

  const { runApproveAllowance, runSwapTokensForTokens, runDirectDeposit } =
    routerMutations;

  const handleConnectWalletButtonClick = useCallback(async () => {
    await connect(web3ModalConfig);
  }, [connect]);

  const handleResetButtonClick = useCallback(() => {
    rootMutation.reset();
  }, [rootMutation]);

  const handleApproveButtonClick = useCallback(() => {
    runApproveAllowance();
  }, [runApproveAllowance]);

  const handleSwapButtonClick = useCallback(() => {
    if (isUseDirectDepositMode) {
      runDirectDeposit();
    } else {
      runSwapTokensForTokens();
    }
  }, [isUseDirectDepositMode, runDirectDeposit, runSwapTokensForTokens]);

  const sourceValueBig = new Big(sourceValue || 0);
  const targetValueBig = new Big(targetValue || 0);

  const isSwapButtonDisabled =
    isSourceValueLoading ||
    isTargetValueLoading ||
    !sourceTokenData ||
    !targetTokenData ||
    sourceValueBig.lte(0) ||
    targetValueBig.lte(0);

  const {
    isLoading: isMutationLoading,
    isError: isMutationError,
    data: isMutationSucceeded,
    error: mutationError,
  } = rootMutation;

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

  if (isMutationError && mutationError) {
    return (
      <BaseSwapButton
        onClick={handleResetButtonClick}
        primaryColor="#EB5853"
        secondaryColor="#ffffff"
      >
        {mutationError.data?.message ?? mutationError.message}
      </BaseSwapButton>
    );
  }

  if (isMutationSucceeded) {
    return (
      <BaseSwapButton
        onClick={handleResetButtonClick}
        primaryColor="#81E429"
        secondaryColor="#ffffff"
      >
        Succeed
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

  if (
    sourceTokenData?.allowance &&
    sourceValueBig.gt(0) &&
    sourceValueBig.gt(sourceTokenData.allowance)
  ) {
    return (
      <BaseSwapButton
        isLoading={isMutationLoading}
        onClick={handleApproveButtonClick}
        primaryColor="#f3ba2f"
        secondaryColor="#ffffff"
      >
        {`Approve ${sourceTokenData.symbol}`}
      </BaseSwapButton>
    );
  }

  return (
    <BaseSwapButton
      disabled={isSwapButtonDisabled}
      isLoading={isMutationLoading}
      onClick={handleSwapButtonClick}
      primaryColor="#259DDF"
      secondaryColor="#ffffff"
    >
      Swap
    </BaseSwapButton>
  );
};
