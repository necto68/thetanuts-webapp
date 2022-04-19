import styled from "styled-components";
import { motion } from "framer-motion";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TabsHeaderContainer = styled.div`
  display: flex;
  gap: 25px;
  border-bottom: 1px solid #9e9e9e;

  padding: 0 40px;

  @media (max-width: ${sizes.md}px) {
    padding: 0 15px;
  }
`;

export const TabsLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;
`;

export const TabContainer = styled.div`
  overflow: hidden;

  padding: 40px;

  @media (max-width: ${sizes.md}px) {
    padding: 15px;
  }
`;

export {
  Title,
  Container as TitleContainer,
  Description,
} from "../../theta-index/components/ThetaIndexLayout.styles";

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
