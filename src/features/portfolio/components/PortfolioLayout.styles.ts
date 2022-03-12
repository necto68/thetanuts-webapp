import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TabsHeaderContainer = styled.div`
  display: flex;
  gap: 25px;
  padding: 0 40px;
  border-bottom: 1px solid #9e9e9e;
`;

export const TabsLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;
`;

export const TabContainer = styled.div`
  padding: 40px;
  overflow: hidden;
`;

export {
  Title,
  Container as TitleContainer,
} from "../../theta-index/components/ThateIndexLayout.styles";

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
