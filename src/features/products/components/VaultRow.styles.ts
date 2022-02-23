import styled from "styled-components";
import { motion } from "framer-motion";

import { VaultRiskLevel } from "../../vault/constants";

const mapRiskLevelToColor: Record<VaultRiskLevel, string> = {
  [VaultRiskLevel.LOW]: "#92F0A9",
  [VaultRiskLevel.MEDIUM]: "#FFE586",
  [VaultRiskLevel.HIGH]: "#E08585",
};

interface Colored {
  color: string;
}

export const Row = styled(motion.tr).attrs<Colored>(({ color }) => ({
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

export const Cell = styled.td`
  vertical-align: center;
  padding: 22px 20px;
`;

export const CellValue = styled.span`
  font-family: Barlow;
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
`;

export const RiskLevelValue = styled(CellValue)<{ riskLevel: VaultRiskLevel }>`
  color: ${({ riskLevel }) => mapRiskLevelToColor[riskLevel]};
`;
