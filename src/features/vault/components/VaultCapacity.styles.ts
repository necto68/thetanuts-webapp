import styled from "styled-components";
import { motion } from "framer-motion";

export const DepositContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`;

export const DepositTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DepositTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #c4c4c4;
`;

export const DepositValue = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 15px;
  color: #ffffff;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #233447;
  border-radius: 5px;
  overflow: hidden;
`;

export const Progress = styled(motion.div).attrs<{
  currentDepositRate: number;
}>(({ currentDepositRate }) => ({
  initial: { width: 0 },
  animate: { width: `${currentDepositRate}%` },
}))<{ color: string; currentDepositRate: number }>`
  height: 100%;
  background-color: ${({ color }) => color};
`;
