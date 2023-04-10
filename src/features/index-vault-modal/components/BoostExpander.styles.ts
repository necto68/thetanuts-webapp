import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

interface BoostExpanderProps {
  currentPosition: number;
  suppliedTokenAddress: string;
}

export const Container = styled.span<BoostExpanderProps>`
  borderColor: #323844;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${({ currentPosition, suppliedTokenAddress }) =>
    currentPosition > 0 && suppliedTokenAddress !== "0x0000000000000000000000000000000000000000" ? "#17B579" : "#323844"};
  border-width: 1px;
  border-style: solid;
  cursor: ${({ currentPosition, suppliedTokenAddress }) =>
    currentPosition > 0 && suppliedTokenAddress !== "0x0000000000000000000000000000000000000000" ? "pointer" : "default"}; // Set cursor to "pointer" if currentPosition > 0
  &:hover {
    cursor: ${({ currentPosition, suppliedTokenAddress }) =>
      currentPosition > 0 && suppliedTokenAddress !== "0x0000000000000000000000000000000000000000" ? "pointer" : "default"}; // Set cursor to "pointer" if currentPosition > 0
  }
`;

export const HeaderLink = styled(motion.a).attrs(() => ({
  whileHover: {
    scale: 1.03,
  },
}))`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  border-radius: 4px;
`;

export const HeaderButton = styled(BaseButton).attrs(() => ({
  primaryColor: "transparent",
}))`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
`;

export const ExpandableContainer = styled(motion.div).attrs<{
  isOpen: boolean;
  maxHeight?: number;
}>(({ isOpen }) => ({
  initial: false,

  animate: {
    height: isOpen ? "auto" : 0,
  },
}))<{
  isOpen: boolean;
  maxHeight?: number;
}>`
  padding: 0 15px;
  overflow: auto;
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight}px;
    `}
`;
