import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;
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
  border-bottom: 1px solid #9e9e9e;

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