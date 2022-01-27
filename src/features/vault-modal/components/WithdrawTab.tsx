import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseButton, SkeletonBox } from '../../shared/components';
import { LoadingButton } from '../../shared/components';
import { useModalVault, useWithdrawState } from '../hooks';
import { PendingWithdrawal } from './PendingWithdrawal';

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxButtonClick = () => {
    setAmount(userBalance.toString());
  };

  if (
    typeof userPosition === 'undefined' ||
    typeof depositSymbol === 'undefined'
  ) {
    return (
      <TabContainer>
        <SkeletonBox width={170} height={27} />
        <SkeletonBox width={312} height={49} />
        <WithdrawButtonContainer>
          <SkeletonBox width={148} height={42} />
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
          <WithdrawInput value={amount} onChange={handleInputChange} />
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
        userPendingWithdrawal={userPendingWithdrawal}
        depositSymbol={depositSymbol}
        isReadyForWithdraw={isReadyForWithdraw}
      />
      <WithdrawButtonContainer>
        <LoadingButton
          disabled={!isValidAmount || isError || isInitiatingWithdraw}
          isLoading={isInitiatingWithdraw}
          primaryColor="#e1a335"
          onClick={initWithdraw}
        >
          {`Withdraw ${depositSymbol}`}
        </LoadingButton>
      </WithdrawButtonContainer>
    </TabContainer>
  );
};

const TabContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    x: '50%',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '50%',
    transition: {
      type: 'linear',
    },
  },
}))`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 10px 20px;
  overflow: hidden;
`;

const CurrentPositionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PositionTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: #ffffff;
`;

const PositionValue = styled(PositionTitle)`
  font-weight: 700;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InputWrapper = styled(motion.div).attrs<{ isError: boolean }>(
  ({ isError }) => ({
    animate: {
      outlineColor: isError ? 'rgba(255, 77, 77, 1)' : 'rgba(255, 77, 77, 0)',
    },
  }),
)<{ isError: boolean }>`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;

  outline-width: 2px;
  outline-style: solid;
`;

const WithdrawInput = styled.input.attrs(() => ({
  placeholder: '0',
  type: 'number',
}))`
  display: flex;
  flex: 1;

  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  border: 0;
  text-align: right;

  &::placeholder {
    color: #9e9e9e;
  }
`;

const DepositSymbol = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
`;

const MaxButton = styled(BaseButton)`
  padding: 9px;
`;

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 14px;
  color: #ff4d4d;
`;

const WarningTitle = styled(ErrorTitle)`
  color: #e1a335;
`;

const WithdrawButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;
