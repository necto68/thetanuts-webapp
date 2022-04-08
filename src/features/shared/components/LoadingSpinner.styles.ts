import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div).attrs(() => ({
  initial: {
    scale: 0,
    rotate: 0,
  },

  animate: {
    scale: 1,
    rotate: 360,
  },

  transition: {
    rotate: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1,
    },
  },

  exit: {
    scale: 0,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
`;
