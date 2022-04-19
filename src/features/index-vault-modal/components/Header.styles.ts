import styled from "styled-components";
import { motion } from "framer-motion";

import { sizes } from "../../shared/constants";
import type { ThemeType } from "../types";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 2;

  padding: 1.5rem 2.5rem 0;

  @media (max-width: ${sizes.md}px) {
    padding: 1.5rem 1.5rem 0;
  }
`;

export const Title = styled(motion.span).attrs<ThemeType>(({ theme }) => ({
  initial: false,

  animate: {
    color: theme === "dark" ? "#FFFFFF" : "#233447",
  },
}))<ThemeType>`
  font-family: Barlow;
  font-weight: 600;
  font-size: 1.4rem;
  text-transform: uppercase;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: ${sizes.md}px) {
    gap: 1rem;
  }
`;

export const ChainSelectContainer = styled(motion.div).attrs<{
  isShow: boolean;
}>(({ isShow }) => ({
  animate: {
    opacity: isShow ? 1 : 0,
  },
}))<{ isShow: boolean }>``;
