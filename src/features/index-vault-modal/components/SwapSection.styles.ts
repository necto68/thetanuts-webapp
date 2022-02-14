import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SwapInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
`;

export const BalanceTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 14px;
`;

export const FlipButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
`;

export const FlipButton = styled(BaseButton).attrs<{ isFlipped: boolean }>(
  ({ isFlipped }) => ({
    primaryColor: "#061F3A",
    secondaryColor: "#061F3A",

    animate: {
      rotate: isFlipped ? "-180deg" : 0,
      transition: { duration: 0.6 },
    },
  })
)<{ isFlipped: boolean }>`
  padding: 8px;
  border-radius: 50%;
`;

export const SwapInputCardAnimateContainer = styled(motion.div).attrs<{
  downDirection: boolean;
}>(({ downDirection }) => ({
  initial: {
    rotateX: downDirection ? "90deg" : "-90deg",
    transformPerspective: 300,
  },

  animate: {
    rotateX: "0deg",
    transformPerspective: 300,
  },

  exit: {
    rotateX: downDirection ? "90deg" : "-90deg",
    transformPerspective: 300,
  },

  transition: { duration: 0.3, ease: "linear" },
}))<{ downDirection: boolean }>``;
