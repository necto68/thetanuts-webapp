import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabContainer = styled.div`
  overflow: hidden;

  padding: 25px;

  ${screens.md} {
    padding: 15px;
  }
`;

export const TabsHeaderContainer = styled.div`
  display: flex;
  gap: 30px;
  border-bottom: 1px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};

  padding: 0 25px;

  ${screens.md} {
    padding: 0 15px;
  }
`;

export const PositionsTabContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    x: "-50%",
  },

  animate: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: "-50%",

    transition: {
      type: "linear",
    },
  },
}))``;

export const TransactionHistoryTabContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    x: "50%",
  },

  animate: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: "50%",

    transition: {
      type: "linear",
    },
  },
}))``;
