import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";
import { BaseButton, BoostButton } from "../../shared/components";

interface Props {
  children: React.ReactNode;
  showModalBoostButton: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  justify-content: end;
  min-height: ${(props) => (props.showModalBoostButton ? "409px" : "327px")};
`;

export const BackgroundAnimationContainer = styled.div`
  position: relative;
  // z-index: 1;
  // flex: 1;
  width: 147px;
  height: 147px;
  top: 100px; /* update to be relative to the Container */
  left: 50%; /* update to be relative to the Container */
  transform: translate(-50%, -50%);
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
  text-align: center;
`;

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 600;
  font-size: 25px;
  color: #ffffff;
  // text-align: center;
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
  align-items: center;
  margin-left: 10px;
`;

export const RatioTitle = styled(Title)`
  font-size: 25px;
  color: #ffffff;
  white-space: nowrap;
`;

export const ToTitle = styled(RatioTitle)`
  font-weight: 300;
`;

export const TransactionLink = styled(motion.a).attrs<{
  isMutationSucceed: boolean;
}>(({ isMutationSucceed }) => ({
  initial: false,

  animate: {
    // eslint-disable-next-line sonarjs/no-all-duplicated-branches
    color: isMutationSucceed ? "#1FFFAB" : "#1FFFAB",
  },
}))<{ isMutationSucceed: boolean }>`
  font-family: Barlow;
  font-weight: 600;
  font-size: 20px;
`;

export const CloseButton = styled(BaseButton)`
  width: 100%;
`;

export const ModalBoostButton = styled(BoostButton)`
  width: 100%;
`;
