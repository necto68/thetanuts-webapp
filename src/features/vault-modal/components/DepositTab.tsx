import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { BaseButton } from '../../shared/components';
import { LoadingButton } from '../../shared/components';
import { SkeletonBox } from '../../shared/components';
import { useModalVault } from '../hooks';
import { useDepositState } from '../hooks';
import { PendingWithdrawal } from './PendingWithdrawal';

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxButtonClick = () => {
    if (userWalletBalance) {
      setAmount(userWalletBalance.toString());
    }
  };

  if (
    typeof userPosition === 'undefined' ||
    typeof depositSymbol === 'undefined' ||
    typeof userWalletBalance === 'undefined' ||
    typeof maxDeposit === 'undefined' ||
    typeof currentDeposit === 'undefined'
  ) {
    return (
      <TabContainer>
        <SkeletonBox width={170} height={27} />
        <SkeletonBox width={170} height={27} />
        <SkeletonBox width={312} height={49} />
        <UnlockAssetContainer>
          <SkeletonBox width={148} height={42} />
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
          <DepositInput value={amount} onChange={handleInputChange} />
          <DepositSymbol>{depositSymbol}</DepositSymbol>
        </InputWrapper>
        <MaxButton onClick={handleMaxButtonClick}>MAX</MaxButton>
      </InputContainer>
      {isError ? (
        <ErrorContainer>
          <ErrorTitle>
            {`The amount you wish to deposit exceeds ${
              isExceedBalance ? 'your balance.' : 'vault max capacity.'
            }`}
          </ErrorTitle>
          <ErrorTitle>{`You can deposit not more than ${maxDepositingValue} ${depositSymbol}.`}</ErrorTitle>
        </ErrorContainer>
      ) : null}
      <PendingWithdrawal
        userPendingWithdrawal={userPendingWithdrawal}
        depositSymbol={depositSymbol}
        isReadyForWithdraw={isReadyForWithdraw}
      />
      <AnimatePresence initial={false} exitBeforeEnter>
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
                primaryColor="#1ce260"
                onClick={approvePermanentAllowance}
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
                primaryColor="#1ce260"
                onClick={approveOneTimeAllowance}
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
              primaryColor="#1ce260"
              onClick={deposit}
            >
              {`Deposit ${depositSymbol}`}
            </LoadingButton>
          </DepositButtonContainer>
        )}
      </AnimatePresence>
    </TabContainer>
  );
};

const TabContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    x: '-50%',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '-50%',
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

const DepositInput = styled.input.attrs(() => ({
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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 14px;
  color: #ff4d4d;
`;

const UnlockAssetContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    y: '-40px',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '-40px',
    transition: {
      type: 'linear',
    },
  },
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: auto;
`;

const UnlockAssetTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  color: #1ce260;
`;

const UnlockAssetButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const DepositButtonContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    y: '40px',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '40px',
    transition: {
      type: 'linear',
    },
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;
