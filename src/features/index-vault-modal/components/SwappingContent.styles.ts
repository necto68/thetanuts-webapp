import styled from "styled-components";
import { motion } from "framer-motion";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  min-height: 57.5rem;
`;

export const BackgroundAnimationContainer = styled.div`
  position: fixed;
  z-index: 1;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: end;
  z-index: 2;

  padding: 0 2.5rem 1.5rem;

  @media (max-width: ${sizes.md}px) {
    padding: 0 1.5rem 1.5rem;
  }
`;

export const SwapInfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;

export const SwapTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 4rem;
  color: #ffffff;
  text-align: center;
`;

export const AnimationContainer = styled(motion.div).attrs<{ isShow: boolean }>(
  ({ isShow }) => ({
    initial: false,

    animate: {
      opacity: isShow ? 1 : 0,
    },
  })
)<{ isShow: boolean }>`
  width: 12rem;
  height: 12rem;
`;

export const RatioTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const RatioTitle = styled(SwapTitle)`
  font-size: 2.3rem;
  color: #ffffff;
`;

export const ToTitle = styled(RatioTitle)`
  font-weight: 300;
`;

export const TransactionLink = styled(motion.a).attrs<{
  isSwapSuccessful: boolean;
}>(({ isSwapSuccessful }) => ({
  initial: false,

  animate: {
    color: isSwapSuccessful ? "#061F3A" : "#1FFFAB",
  },
}))<{ isSwapSuccessful: boolean }>`
  font-family: Barlow;
  font-weight: 700;
  font-size: 1.7rem;
`;
