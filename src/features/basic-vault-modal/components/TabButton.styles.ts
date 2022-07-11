import styled from "styled-components";
import { motion } from "framer-motion";

interface ButtonProps {
  isActive?: boolean;
}

export const Button = styled(motion.button).attrs<ButtonProps>(
  ({ isActive }) => ({
    initial: false,

    animate: {
      color: isActive ? "#000000" : "#5F6D7C",

      backgroundColor: isActive
        ? "rgba(255, 255, 255, 1)"
        : "rgba(255, 255, 255, 0)",

      boxShadow: isActive
        ? "0 0 4px rgba(0, 0, 0, 0.2)"
        : "0 0 4px rgba(0, 0, 0, 0)",
    },

    whileHover: {
      scale: 1.03,
    },

    whileTap: {
      scale: 0.95,
      opacity: 0.6,
    },
  })
)<ButtonProps>`
  font-family: Barlow;
  font-weight: 600;
  font-size: 24px;

  border-radius: 100px;
  border: none;

  padding: 10px 43px;
  cursor: pointer;
`;
