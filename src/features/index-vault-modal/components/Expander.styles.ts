import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #9e9e9e;
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
  border: 0;
  padding: 12px 16px;
  text-decoration: none;
`;

export const HeaderButton = styled(BaseButton).attrs(() => ({
  primaryColor: "transparent",
}))`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border: 0;
  padding: 12px 16px;
`;

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 12px;
  color: #061f3a;
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
