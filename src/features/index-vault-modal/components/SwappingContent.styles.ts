import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";
import { sizes } from "../../shared/constants";

export const Container = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: min(640px, ${({ height }) => height});
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

  padding: 0 35px 25px;

  @media (max-width: ${sizes.md}px) {
    padding: 0 15px 15px;
  }
`;

export const SwapInfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const SwapTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 50px;
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
  width: 140px;
  height: 140px;
`;

export const RatioTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const RatioTitle = styled(SwapTitle)`
  font-size: 30px;
  color: #ffffff;
`;

export const ToTitle = styled(RatioTitle)`
  font-weight: 300;
`;

export const CloseButton = styled(BaseButton)`
  padding: 12px 24px;
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
  font-size: 20px;
`;
