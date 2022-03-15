import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 535px;
  max-height: 98vh;
  padding: 25px 35px;
  border-radius: 10px;
  background-color: #efebe2;
  overflow: auto;
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
