import styled from "styled-components";
import type { AnimationLifecycles } from "framer-motion";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 430px;
  border-radius: 10px;
  background-color: #1a1d23;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const ContentAnimatedContainer = styled(
  motion.div
).attrs<AnimationLifecycles>(({ onAnimationComplete }) => ({
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },

  onAnimationComplete,
}))``;
