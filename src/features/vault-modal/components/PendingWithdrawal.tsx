import { FC } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingButton } from '../../shared/components';
import { Vault } from '../../vault/types';
import { useWithdrawState } from '../hooks';

type PendingWithdrawalProps = Pick<
  Vault,
  'userPendingWithdrawal' | 'depositSymbol' | 'isReadyForWithdraw'
>;

export const PendingWithdrawal: FC<PendingWithdrawalProps> = ({
  userPendingWithdrawal,
  depositSymbol,
  isReadyForWithdraw,
}) => {
  const withdrawState = useWithdrawState();

  if (!withdrawState || typeof userPendingWithdrawal === 'undefined') {
    return null;
  }

  if (userPendingWithdrawal.eq(0)) {
    return <AnimatePresence initial={false} />;
  }

  const pendingWithdrawalString = userPendingWithdrawal.round(4).toString();

  const { isCancelingWithdraw, isWithdrawing, cancelWithdraw, withdraw } =
    withdrawState;

  return (
    <AnimatePresence initial={false}>
      <Container>
        <InfoContainer>
          <PendingWithdrawalTitle>
            You have a pending withdrawal:
          </PendingWithdrawalTitle>
          <AssetTitle>
            {`${pendingWithdrawalString} ${depositSymbol}`}
          </AssetTitle>
          {isReadyForWithdraw ? (
            <ReturnLaterTitle>You can claim your withdrawal</ReturnLaterTitle>
          ) : (
            <ReturnLaterTitle>
              Please return when epoch will expiry to claim your withdrawal
            </ReturnLaterTitle>
          )}
        </InfoContainer>
        <ButtonsContainer>
          {!isReadyForWithdraw ? (
            <LoadingButton
              disabled={isCancelingWithdraw}
              isLoading={isCancelingWithdraw}
              primaryColor="#ff4d4d"
              onClick={cancelWithdraw}
            >
              Cancel
            </LoadingButton>
          ) : null}
          {isReadyForWithdraw ? (
            <LoadingButton
              disabled={isWithdrawing}
              isLoading={isWithdrawing}
              primaryColor="#00ff3d"
              onClick={withdraw}
            >
              Claim
            </LoadingButton>
          ) : null}
        </ButtonsContainer>
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div).attrs(() => ({
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
  justify-content: space-between;
  gap: 15px;
  background-color: #010c19;
  padding: 15px;
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PendingWithdrawalTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 16px;
  color: #e1a735;
`;

const AssetTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
`;

const ReturnLaterTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;
