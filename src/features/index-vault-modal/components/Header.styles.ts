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

  padding: 25px 35px 0;

  @media (max-width: ${sizes.md}px) {
    padding: 15px 15px 0;
  }
`;

export const Title = styled(motion.span).attrs<ThemeType>(({ theme }) => ({
  initial: false,

  animate: {
    color: theme === "dark" ? "#FFFFFF" : "#233447",
  },
}))<ThemeType>`
  font-family: Barlow;
  font-weight: 500;
  font-size: 20px;
  text-transform: uppercase;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: ${sizes.md}px) {
    gap: 10px;
  }
`;

export const ChainSelectContainer = styled(motion.div).attrs<{
  isShow: boolean;
}>(({ isShow }) => ({
  animate: {
    opacity: isShow ? 1 : 0,
  },
}))<{ isShow: boolean }>``;
