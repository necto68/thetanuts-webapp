import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export interface IconContainerProps {
  width: number;
  height: number;
  color?: string;
}

export const IconContainer = styled(motion.div)<IconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  ${({ color }) =>
    color &&
    css`
      * {
        fill: ${color};
      }
    `}
`;
