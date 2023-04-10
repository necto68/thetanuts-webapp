import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export interface NavigateButtonsProps {
  width: number;
  height: number;
  color?: string;
  hoverColor?: string;
}

export const NavigateButtons = styled(motion.div)<NavigateButtonsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  min-width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  &:hover {
    cursor: pointer;
  }
`;
