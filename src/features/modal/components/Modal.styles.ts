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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const VaultModalContainer = styled(motion.div).attrs(() => ({
  initial: {
    y: "-50%",
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
  },

  exit: {
    y: "-50%",
    opacity: 0,
  },
}))``;
