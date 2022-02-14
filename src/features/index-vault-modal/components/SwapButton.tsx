import styled from "styled-components";
import { motion } from "framer-motion";

export const SwapButton = styled(motion.button).attrs(() => ({
  whileHover: { scale: 1.02, boxShadow: "0 0 10px white" },

  whileTap: {
    scale: 0.97,
    boxShadow: "0 0 0px white",
    opacity: 0.8,
  },
}))`
  font-family: Barlow;
  font-weight: 600;
  font-size: 18px;

  color: white;
  background-color: #4697f0;
  border-radius: 7px;
  border-width: 2px;
  border-style: solid;
  border-color: #4697f0;
  padding: 10px 24px;
  cursor: pointer;
`;
