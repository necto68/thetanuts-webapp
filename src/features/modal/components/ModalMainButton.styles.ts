import styled from "styled-components";
import { motion } from "framer-motion";

interface ModalMainButtonProps {
  primaryColor?: string;
  secondaryColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ModalMainButton = styled(
  motion.button
).attrs<ModalMainButtonProps>(
  ({
    primaryColor = "#323844",
    secondaryColor = "#ffffff",
    disabled = false,
    isLoading = false,
  }) => ({
    whileHover: !disabled && {
      scale: 1.03,
    },

    whileTap: !disabled && {
      scale: 0.95,
      opacity: 0.6,
    },

    animate: isLoading
      ? {
          backgroundColor: [primaryColor, "#ffffff", primaryColor],

          color: [secondaryColor, secondaryColor],

          transition: {
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          },
        }
      : {
          backgroundColor: primaryColor,
          color: secondaryColor,
        },
  })
)<ModalMainButtonProps>`
  font-family: Barlow;
  font-weight: 600;
  font-size: 14px;
  border-radius: 10px;
  border: 0;
  padding: 12px 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
