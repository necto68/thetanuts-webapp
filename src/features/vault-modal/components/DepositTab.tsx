import type { ChangeEvent } from "react";
import { AnimatePresence } from "framer-motion";

import { LoadingButton, SkeletonBox } from "../../shared/components";
import { useModalVault, useDepositState } from "../hooks";

import { PendingWithdrawal } from "./PendingWithdrawal";
import {
  TabContainer,
  UnlockAssetContainer,
  CurrentPositionContainer,
  PositionTitle,
  PositionValue,
  InputContainer,
  InputWrapper,
  DepositInput,
  DepositSymbol,
  MaxButton,
  ErrorContainer,
  ErrorTitle,
  UnlockAssetTitle,
  UnlockAssetButtons,
  DepositButtonContainer,
} from "./DepositTab.styles";

// eslint-disable-next-line complexity,sonarjs/cognitive-complexity
export const DepositTab = () => {
  const vault = useModalVault();
  const depositState = useDepositState();

  if (!vault || !depositState) {
    return null;
  }

  const {
    isReadyForWithdraw,
    depositSymbol,
    currentDeposit,
    maxDeposit,
    userPosition,
    userPendingWithdrawal,
    userWalletBalance,
  } = vault;

  const {
    amount,
    setAmount,
    isValidAmount,
    isExceedBalance,
    isExceedVaultMax,
    isExceedAllowance,
    isPermanentAllowanceApproving,
    isOneTimeAllowanceApproving,
    isDepositing,
    approvePermanentAllowance,
    approveOneTimeAllowance,
    deposit,
  } = depositState;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleMaxButtonClick = () => {
    if (userWalletBalance) {
      setAmount(userWalletBalance.toString());
    }
  };

  if (
    typeof userPosition === "undefined" ||
    typeof depositSymbol === "undefined" ||
    typeof userWalletBalance === "undefined" ||
    typeof maxDeposit === "undefined" ||
    typeof currentDeposit === "undefined"
  ) {
    return (
      <TabContainer>
        <SkeletonBox height={27} width={170} />
        <SkeletonBox height={27} width={170} />
        <SkeletonBox height={49} width={312} />
        <UnlockAssetContainer>
          <SkeletonBox height={42} width={148} />
        </UnlockAssetContainer>
      </TabContainer>
    );
  }

  const isError = isExceedBalance || isExceedVaultMax;
  const maxDepositing = isExceedBalance
    ? userWalletBalance
    : maxDeposit.sub(currentDeposit);
  const maxDepositingValue = maxDepositing.toString();

  return (
    <TabContainer>
      <CurrentPositionContainer>
        <PositionTitle>Current Position:</PositionTitle>
        <PositionValue>{`${userPosition.toString()} ${depositSymbol}`}</PositionValue>
      </CurrentPositionContainer>
      <CurrentPositionContainer>
        <PositionTitle>Wallet Balance:</PositionTitle>
        <PositionValue>{`${userWalletBalance.toString()} ${depositSymbol}`}</PositionValue>
      </CurrentPositionContainer>
      <InputContainer>
        <InputWrapper isError={isError}>
          <DepositInput onChange={handleInputChange} value={amount} />
          <DepositSymbol>{depositSymbol}</DepositSymbol>
        </InputWrapper>
        <MaxButton onClick={handleMaxButtonClick}>MAX</MaxButton>
      </InputContainer>
      {isError ? (
        <ErrorContainer>
          <ErrorTitle>
            {`The amount you wish to deposit exceeds ${
              isExceedBalance ? "your balance." : "vault max capacity."
            }`}
          </ErrorTitle>
          <ErrorTitle>{`You can deposit not more than ${maxDepositingValue} ${depositSymbol}.`}</ErrorTitle>
        </ErrorContainer>
      ) : null}
      <PendingWithdrawal
        depositSymbol={depositSymbol}
        isReadyForWithdraw={isReadyForWithdraw}
        userPendingWithdrawal={userPendingWithdrawal}
      />
      <AnimatePresence exitBeforeEnter initial={false}>
        {isExceedAllowance ? (
          <UnlockAssetContainer key="unlockAsset">
            <UnlockAssetTitle>{`Unlock ${depositSymbol}`}</UnlockAssetTitle>
            <UnlockAssetButtons>
              <LoadingButton
                disabled={
                  isPermanentAllowanceApproving ||
                  isOneTimeAllowanceApproving ||
                  isError
                }
                isLoading={isPermanentAllowanceApproving}
                onClick={approvePermanentAllowance}
                primaryColor="#1ce260"
              >
                Permanently
              </LoadingButton>
              <LoadingButton
                disabled={
                  isOneTimeAllowanceApproving ||
                  isPermanentAllowanceApproving ||
                  isError
                }
                isLoading={isOneTimeAllowanceApproving}
                onClick={approveOneTimeAllowance}
                primaryColor="#1ce260"
              >
                This time only
              </LoadingButton>
            </UnlockAssetButtons>
          </UnlockAssetContainer>
        ) : (
          <DepositButtonContainer key="deposit">
            <LoadingButton
              disabled={!isValidAmount || isError || isDepositing}
              isLoading={isDepositing}
              onClick={deposit}
              primaryColor="#1ce260"
            >
              {`Deposit ${depositSymbol}`}
            </LoadingButton>
          </DepositButtonContainer>
        )}
      </AnimatePresence>
    </TabContainer>
  );
};
