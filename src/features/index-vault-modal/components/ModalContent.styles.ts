import styled from "styled-components";
import { motion } from "framer-motion";

import type { ThemeType } from "../types";

export const Container = styled(motion.div).attrs<ThemeType>(({ theme }) => ({
  initial: false,

  animate: {
    backgroundColor: theme === "dark" ? "#061F3A" : "#EFEBE2",
  },
}))<ThemeType>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 43rem;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ContentAnimatedContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
}))``;
