import styled from "styled-components";
import { motion } from "framer-motion";

export interface IconContainerProps {
  width: number;
  height: number;
}

export const IconContainer = styled(motion.div)<IconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
