import styled from "styled-components";
import { motion } from "framer-motion";

interface BaseSwapButtonProps {
  primaryColor?: string;
  secondaryColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const BaseSwapButton = styled(motion.button).attrs<BaseSwapButtonProps>(
  ({ primaryColor = "", secondaryColor = "", disabled }) => ({
    whileHover: !disabled && {
      scale: 1.02,
      boxShadow: `0 0 10px ${primaryColor}`,
    },

    whileTap: !disabled && {
      scale: 0.97,
      boxShadow: `0 0 0px ${primaryColor}`,
      opacity: 0.8,
    },

    animate: {
      backgroundColor: disabled && !primaryColor ? "#dddddd" : primaryColor,
      color: disabled && !secondaryColor ? "#9f9f9f" : secondaryColor,
    },
  })
)<BaseSwapButtonProps>`
  font-family: Barlow;
  font-weight: 600;
  font-size: 18px;
  border-radius: 10px;
  border: 0;
  padding: 16px 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
