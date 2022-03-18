import styled from "styled-components";
import { motion } from "framer-motion";

export const Backdrop = styled(motion.div).attrs(() => ({
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
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const VaultModalContainer = styled(motion.div).attrs(() => ({
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
}))`
  display: flex;
  max-width: 95vw;
  max-height: 98vh;
`;
