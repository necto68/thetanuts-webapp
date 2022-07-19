import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";
import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  min-height: 575px;
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

  padding: 0 25px 15px;

  ${screens.md} {
    padding: 0 15px 15px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 40px;
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
  width: 120px;
  height: 120px;
`;

export const RatioTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const RatioTitle = styled(Title)`
  font-size: 23px;
  color: #ffffff;
`;

export const ToTitle = styled(RatioTitle)`
  font-weight: 300;
`;

export const TransactionLink = styled(motion.a).attrs<{
  isMutationSucceed: boolean;
}>(({ isMutationSucceed }) => ({
  initial: false,

  animate: {
    color: isMutationSucceed ? "#061F3A" : "#1FFFAB",
  },
}))<{ isMutationSucceed: boolean }>`
  font-family: Barlow;
  font-weight: 700;
  font-size: 17px;
`;

export const CloseButton = styled(BaseButton)`
  width: 100%;
`;
