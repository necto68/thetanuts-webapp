import type { ChangeEvent } from "react";

import { SkeletonBox, LoadingButton } from "../../shared/components";
import { useModalVault, useWithdrawState } from "../hooks";

import { PendingWithdrawal } from "./PendingWithdrawal";
import {
  CurrentPositionContainer,
  PositionTitle,
  PositionValue,
  InputContainer,
  InputWrapper,
  MaxButton,
  DepositInput,
  DepositSymbol,
  ErrorTitle,
} from "./DepositTab.styles";
import {
  TabContainer,
  WithdrawButtonContainer,
  TitlesContainer,
  WarningTitle,
} from "./WithdrawTab.styles";

// eslint-disable-next-line complexity
export const WithdrawTab = () => {
  const vault = useModalVault();
  const withdrawState = useWithdrawState();

  if (!vault || !withdrawState) {
    return null;
  }

  const {
    isEpochSettled,
    isEpochExpired,
    isReadyForWithdraw,
    depositSymbol,
    userPosition,
    userPendingWithdrawal,
  } = vault;

  const {
    amount,
    setAmount,
    userBalance,
    isValidAmount,
    isExceedUserBalance,
    isInitiatingWithdraw,
    initWithdraw,
  } = withdrawState;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleMaxButtonClick = () => {
    setAmount(userBalance.toString());
  };

  if (
    typeof userPosition === "undefined" ||
    typeof depositSymbol === "undefined"
  ) {
    return (
      <TabContainer>
        <SkeletonBox height={27} width={170} />
        <SkeletonBox height={49} width={312} />
        <WithdrawButtonContainer>
          <SkeletonBox height={42} width={148} />
        </WithdrawButtonContainer>
      </TabContainer>
    );
  }

  const isError = isExceedUserBalance;
  const isEpochRunning = !isEpochSettled && !isEpochExpired;

  const maxWithdrawingValue = userBalance.toString();

  return (
    <TabContainer>
      <CurrentPositionContainer>
        <PositionTitle>Current Position:</PositionTitle>
        <PositionValue>{`${userPosition.toString()} ${depositSymbol}`}</PositionValue>
      </CurrentPositionContainer>
      <InputContainer>
        <InputWrapper isError={isError}>
          <DepositInput onChange={handleInputChange} value={amount} />
          <DepositSymbol>{depositSymbol}</DepositSymbol>
        </InputWrapper>
        <MaxButton onClick={handleMaxButtonClick}>MAX</MaxButton>
      </InputContainer>
      {isError ? (
        <TitlesContainer>
          <ErrorTitle>
            The amount you wish to withdraw exceeds your position.
          </ErrorTitle>
          <ErrorTitle>{`You can withdraw not more than ${maxWithdrawingValue} ${depositSymbol}.`}</ErrorTitle>
        </TitlesContainer>
      ) : null}
      {!isError && isValidAmount && isEpochRunning ? (
        <TitlesContainer>
          <WarningTitle>
            The amount you will withdraw when epoch will expiry can be less than
            the amount you wish to withdraw.
          </WarningTitle>
          <WarningTitle>
            For example, if strike price will be struck.
          </WarningTitle>
        </TitlesContainer>
      ) : null}
      <PendingWithdrawal
        depositSymbol={depositSymbol}
        isReadyForWithdraw={isReadyForWithdraw}
        userPendingWithdrawal={userPendingWithdrawal}
      />
      <WithdrawButtonContainer>
        <LoadingButton
          disabled={!isValidAmount || isError || isInitiatingWithdraw}
          isLoading={isInitiatingWithdraw}
          onClick={initWithdraw}
          primaryColor="#e1a335"
        >
          {`Withdraw ${depositSymbol}`}
        </LoadingButton>
      </WithdrawButtonContainer>
    </TabContainer>
  );
};
