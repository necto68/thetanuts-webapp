import styled from "styled-components";
import { motion } from "framer-motion";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 535px;
  border-radius: 10px;
  background-color: #efebe2;
  overflow-x: hidden;
  overflow-y: auto;

  padding: 25px 35px;

  @media (max-width: ${sizes.md}px) {
    padding: 15px 15px;
  }
`;

export const ContentAnimatedContainer = styled(motion.div).attrs<{
  downDirection: boolean;
}>(({ downDirection }) => ({
  initial: {
    rotateX: downDirection ? "90deg" : "-90deg",
    transformPerspective: 2000,
  },

  animate: {
    rotateX: "0deg",
    transformPerspective: 2000,
  },

  exit: {
    rotateX: downDirection ? "90deg" : "-90deg",
    transformPerspective: 2000,
  },

  transition: { duration: 0.3, ease: "linear" },
}))<{ downDirection: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
