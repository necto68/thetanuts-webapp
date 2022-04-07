import styled from "styled-components";
import { motion } from "framer-motion";

interface BaseButtonProps {
  primaryColor?: string;
  secondaryColor?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const BaseButton = styled(motion.button).attrs<Required<BaseButtonProps>>(
  ({ primaryColor, disabled }) => ({
    whileHover: !disabled && {
      scale: 1.03,
    },

    whileTap: !disabled && {
      scale: 0.95,
      opacity: 0.6,
    },

    primaryColor,
    disabled,
  })
)<BaseButtonProps>`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;

  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ primaryColor }) => primaryColor};

  color: ${({ primaryColor }) => primaryColor};
  background-color: ${({ secondaryColor }) => secondaryColor};

  padding: 5px 24px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

BaseButton.defaultProps = {
  disabled: false,
  primaryColor: "#ffffff",
  secondaryColor: "transparent",
};

export type { BaseButtonProps };
export { BaseButton };
