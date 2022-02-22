import styled from "styled-components";
import { motion } from "framer-motion";

interface BaseSwapButtonProps {
  primaryColor?: string;
  secondaryColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const BaseSwapButton = styled(motion.button).attrs<BaseSwapButtonProps>(
  ({ primaryColor = "", secondaryColor = "", isLoading, disabled }) => ({
    whileHover: !disabled && {
      scale: 1.02,
      boxShadow: `0 0 10px ${primaryColor}`,
    },

    whileTap: !disabled && {
      scale: 0.97,
      boxShadow: `0 0 0px ${primaryColor}`,
      opacity: 0.8,
    },

    animate: isLoading
      ? {
          background: `repeating-linear-gradient(to left, ${primaryColor}, ${secondaryColor} 116px, ${primaryColor} 232px)`,
          backgroundPosition: "232px center",

          color: secondaryColor,

          transition: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          },
        }
      : {
          background: disabled
            ? "repeating-linear-gradient(to left, #dddddd, #dddddd)"
            : `repeating-linear-gradient(to left, ${primaryColor}, ${primaryColor})`,

          backgroundPosition: "0% 0%",
          color: disabled ? "#9f9f9f" : secondaryColor,
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
