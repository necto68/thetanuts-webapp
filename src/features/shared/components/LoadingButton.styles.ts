import styled from "styled-components";
import { motion } from "framer-motion";

interface Colored {
  color: string;
}

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const Spinner = styled(motion.div).attrs<Colored>(() => ({
  initial: {
    scale: 0,
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
}))<Colored>`
  width: 18px;
  height: 18px;
  border: 3px solid;
  border-color: ${({ color }) => color} transparent ${({ color }) => color}
    transparent;
  border-radius: 50%;
`;
