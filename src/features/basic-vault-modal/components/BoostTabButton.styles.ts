import styled from "styled-components";
import { motion } from "framer-motion";

interface ButtonProps {
  isActive?: boolean;
  isSmall?: boolean;
}

export const Button = styled(motion.button).attrs<ButtonProps>(
  ({ isActive }) => ({
    initial: false,

    animate: {
      backgroundColor: isActive
        ? "rgba(18, 204, 134, 1)"
        : "rgba(18, 204, 134, 0)",

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
  width: 100%;

  font-family: Roboto;
  font-weight: 600;
  font-size: ${({ isSmall }) => (isSmall ? "15px" : "25px")};

  color: #ffffff;

  border-radius: 8px;
  border: none;

  padding: ${({ isSmall }) => (isSmall ? "8px 14px" : "10px 43px")};
  cursor: pointer;
`;
