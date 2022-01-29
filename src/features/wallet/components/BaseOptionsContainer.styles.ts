import styled from "styled-components";
import { motion } from "framer-motion";

interface ContainerProps {
  topPosition: number;
  leftPosition: number;
}

export const Container = styled(motion.div).attrs(() => ({
  initial: {
    y: 30,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
  },

  exit: { y: 30, opacity: 0 },
}))<ContainerProps>`
  position: absolute;
  top: ${({ topPosition }) => topPosition}px;
  left: ${({ leftPosition }) => leftPosition}px;
  z-index: 1;
`;
