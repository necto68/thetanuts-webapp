import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";

interface ChainSelectContainerProps {
  isShow: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 2;

  padding: 24px 24px 0;

  ${screens.md} {
    padding: 16px 16px 0;
  }
`;

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 30px;

  ${screens.md} {
    gap: 10px;
  }
`;

export const ChainSelectContainer = styled(
  motion.div
).attrs<ChainSelectContainerProps>(({ isShow }) => ({
  initial: false,

  animate: {
    opacity: isShow ? 1 : 0,
  },
}))<ChainSelectContainerProps>``;
