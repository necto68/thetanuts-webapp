import { FC } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { SkeletonBox } from '../../shared/components';
import { Vault } from '../types';
import { numberFormatter } from '../../shared/helpers';
import { getCurrentDepositRate } from '../helpers';

type VaultCapacityProps = {
  primaryColor: string;
} & Pick<Vault, 'currentDeposit' | 'maxDeposit' | 'depositSymbol'>;

export const VaultCapacity: FC<VaultCapacityProps> = ({
  currentDeposit,
  maxDeposit,
  depositSymbol,
  primaryColor,
}) => {
  const currentDepositRate = getCurrentDepositRate(currentDeposit, maxDeposit);

  return (
    <DepositContainer>
      <DepositTitleContainer>
        <DepositTitle>Current Deposits</DepositTitle>
        {typeof currentDeposit !== 'undefined' ? (
          <DepositValue>
            <b>{`${currentDepositRate}% `}</b>
            Deposited
          </DepositValue>
        ) : (
          <SkeletonBox width={120} height={23} />
        )}
      </DepositTitleContainer>
      <ProgressBar>
        <Progress
          color={primaryColor}
          currentDepositRate={currentDepositRate ?? 0}
        />
      </ProgressBar>
      <DepositTitleContainer>
        <DepositTitle>Max Capacity</DepositTitle>
        {typeof maxDeposit !== 'undefined' ? (
          <DepositValue>
            {`${numberFormatter.format(
              maxDeposit.toNumber(),
            )} ${depositSymbol}`}
          </DepositValue>
        ) : (
          <SkeletonBox width={120} height={23} />
        )}
      </DepositTitleContainer>
    </DepositContainer>
  );
};

const DepositContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`;

const DepositTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DepositTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #c4c4c4;
`;

const DepositValue = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 15px;
  color: #ffffff;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #233447;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled(motion.div).attrs<{ currentDepositRate: number }>(
  ({ currentDepositRate }) => ({
    initial: { width: 0 },
    animate: { width: `${currentDepositRate}%` },
  }),
)<{ color: string; currentDepositRate: number }>`
  height: 100%;
  background-color: ${({ color }) => color};
`;
