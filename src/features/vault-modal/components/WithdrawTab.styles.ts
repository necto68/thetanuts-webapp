import styled from "styled-components";
import { motion } from "framer-motion";

import { ErrorTitle } from "./DepositTab.styles";

export const TabContainer = styled(motion.div).attrs(() => ({
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
}))`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 10px 20px;
  overflow: hidden;
`;

export const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WarningTitle = styled(ErrorTitle)`
  color: #e1a335;
`;

export const WithdrawButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;
