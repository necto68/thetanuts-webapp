import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useVault } from '../../vault/hooks';
import { SkeletonBox } from '../../shared/components';
import {
  ILModeTitles,
  ILVaultModes,
  RiskLevelTitles,
  VaultRiskLevels,
  vaultTitles,
  VaultTypes,
} from '../../vault/constants';
import { useModalState } from '../../vault-modal/hooks';
import { numberFormatter } from '../../shared/helpers';
import { getCurrentDepositRate } from '../../vault/helpers';

const getStrategyTitle = (
  vaultType: VaultTypes,
  ILMode: ILVaultModes | null | undefined,
) => {
  if (vaultType === VaultTypes.IL && typeof ILMode === 'number') {
    return ILModeTitles[ILMode];
  }

  if ([VaultTypes.CALL, VaultTypes.PUT].includes(vaultType)) {
    return vaultTitles[vaultType];
  }

  return null;
};

const mapRiskLevelToColor: Record<VaultRiskLevels, string> = {
  [VaultRiskLevels.LOW]: '#92F0A9',
  [VaultRiskLevels.MEDIUM]: '#FFE586',
  [VaultRiskLevels.HIGH]: '#E08585',
};

interface VaultProps {
  vaultAddress: string;
}

export const VaultRow: FC<VaultProps> = ({ vaultAddress }) => {
  const vault = useVault(vaultAddress);
  const [, setModalState] = useModalState();

  const handleRowClick = useCallback(() => {
    setModalState({ isShow: true, vaultAddress });
  }, [setModalState, vaultAddress]);

  if (!vault) {
    return null;
  }

  const {
    type,
    color,
    riskLevel,
    ILMode,
    apy,
    currentDeposit,
    maxDeposit,
    assetSymbol,
    depositSymbol,
    userPosition,
  } = vault;

  const strategyTitle = getStrategyTitle(type, ILMode);
  const riskLevelTitle = RiskLevelTitles[riskLevel];
  const currentDepositRate = getCurrentDepositRate(currentDeposit, maxDeposit);

  if (
    typeof assetSymbol === 'undefined' ||
    typeof depositSymbol === 'undefined' ||
    strategyTitle === null ||
    typeof apy === 'undefined' ||
    typeof maxDeposit === 'undefined' ||
    typeof userPosition === 'undefined'
  ) {
    return (
      <Row color={color} onClick={handleRowClick}>
        <Cell>
          <SkeletonBox width={75} height={22} />
        </Cell>
        <Cell>
          <SkeletonBox width={90} height={22} />
        </Cell>
        <Cell>
          <SkeletonBox width={70} height={22} />
        </Cell>
        <Cell>
          <RiskLevelValue riskLevel={riskLevel}>
            {riskLevelTitle}
          </RiskLevelValue>
        </Cell>
        <Cell>
          <SkeletonBox width={75} height={22} />
        </Cell>
        <Cell>
          <SkeletonBox width={100} height={22} />
        </Cell>
        <Cell>
          <SkeletonBox width={100} height={22} />
        </Cell>
        <Cell>
          <SkeletonBox width={100} height={22} />
        </Cell>
      </Row>
    );
  }

  return (
    <Row color={color} onClick={handleRowClick}>
      <Cell>
        <CellValue>{assetSymbol}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{depositSymbol}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{strategyTitle}</CellValue>
      </Cell>
      <Cell>
        <RiskLevelValue riskLevel={riskLevel}>{riskLevelTitle}</RiskLevelValue>
      </Cell>
      <Cell>
        <CellValue>{`${numberFormatter.format(apy)} %`}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{`${numberFormatter.format(
          maxDeposit.toNumber(),
        )} ${depositSymbol}`}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{`${currentDepositRate} %`}</CellValue>
      </Cell>
      <Cell>
        <CellValue>{`${numberFormatter.format(
          userPosition.round(2).toNumber(),
        )} ${depositSymbol}`}</CellValue>
      </Cell>
    </Row>
  );
};

interface Colored {
  color: string;
}

const Row = styled(motion.tr).attrs<Colored>(({ color }) => ({
  layout: true,
  whileHover: { scale: 1.02, boxShadow: `0 0 20px ${color}` },
  whileTap: {
    scale: 0.97,
    boxShadow: `0 0 10px ${color}`,
    opacity: 0.8,
  },
}))<Colored>`
  cursor: pointer;

  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Cell = styled.td`
  vertical-align: center;
  padding: 22px 20px;
`;

const CellValue = styled.span`
  font-family: Barlow;
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
`;

const RiskLevelValue = styled(CellValue)<{ riskLevel: VaultRiskLevels }>`
  color: ${({ riskLevel }) => mapRiskLevelToColor[riskLevel]};
`;
