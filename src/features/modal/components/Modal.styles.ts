import styled from "styled-components";
import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";

export const Backdrop = styled(motion(Div100vh)).attrs(() => ({
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
}))`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);

  // height: 100vh; - by default because of Div100vh
`;

export const ModalContainer = styled(motion.div).attrs<{
  maxHeight: string;
}>(() => ({
  initial: {
    y: "-50%",
    opacity: 0,
    scale: 0.8,
  },

  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },

  exit: {
    y: "-50%",
    opacity: 0,
    scale: 0.8,
  },
}))<{
  maxHeight: string;
}>`
  display: flex;
  max-width: 95vw;
  max-height: ${({ maxHeight }) => maxHeight};
`;
