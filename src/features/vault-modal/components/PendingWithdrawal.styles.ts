import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    y: "40px",
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: "40px",

    transition: {
      type: "linear",
    },
  },
}))`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  background-color: #010c19;
  padding: 15px;
  border-radius: 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PendingWithdrawalTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 16px;
  color: #e1a735;
`;

export const AssetTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
`;

export const ReturnLaterTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;
