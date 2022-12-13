import styled from "styled-components";
import type { AnchorHTMLAttributes } from "react";
import { motion } from "framer-motion";

export const Container = styled(motion.div).attrs(() => ({
  initial: {
    height: 0,
  },

  animate: {
    height: "auto",
  },
}))`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const WarningTitle = styled.span<{
  size?: number;
  color?: string;
}>`
  font-family: Roboto;
  font-weight: 500;
  font-size: ${({ size = 11 }) => `${size}px`};
  color: ${({ color = "#eb5853" }) => color};
`;

export const WarningLink = styled(WarningTitle).attrs(() => ({
  as: "a",
  target: "_blank",
}))<AnchorHTMLAttributes<HTMLAnchorElement>>`
  color: #e5e5e5;
`;

export const WarningAction = styled.button`
  color: #e5e5e5;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0 1px 2px 2px;
`;
