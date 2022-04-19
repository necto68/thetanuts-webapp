import styled from "styled-components";
import { motion } from "framer-motion";

import { sizes } from "../../shared/constants";
import { Container as ThetaIndexLayoutContainer } from "../../theta-index/components/ThetaIndexLayout.styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TitleContainer = styled(ThetaIndexLayoutContainer)`
  padding: 2rem 3.5rem;

  @media (max-width: ${sizes.md}px) {
    padding: 1.5rem;
  }
`;

export const TabsHeaderContainer = styled.div`
  display: flex;
  gap: 3rem;
  border-bottom: 1px solid #9e9e9e;

  padding: 0 3.5rem;

  @media (max-width: ${sizes.md}px) {
    padding: 0 1.5rem;
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

  padding: 3rem;

  @media (max-width: ${sizes.md}px) {
    padding: 1.5rem;
  }
`;

export {
  Title,
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
