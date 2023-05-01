import styled from "styled-components";
import { motion } from "framer-motion";

interface BoostButtonProps {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  disabled?: boolean;
  isSmall?: boolean;
  onClick?: () => void;
}

const BoostButton = styled(motion.button).attrs<Required<BoostButtonProps>>(
  ({ primaryColor, disabled }) => ({
    whileHover: !disabled && {
      scale: 1.03,
    },

    primaryColor,
    disabled,
  })
)<BoostButtonProps>`
  font-family: Barlow;
  font-weight: 600;
  font-size: "16px";

  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ disabled, primaryColor, secondaryColor }) =>
    disabled ? primaryColor : secondaryColor};

  color: "#ffffff";
  background-color: ${({ disabled, primaryColor, secondaryColor }) =>
    disabled ? primaryColor : secondaryColor};

  padding: ${({ isSmall }) => (isSmall ? "4px 12px" : "7px 24px")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  height: 40px;
`;

BoostButton.defaultProps = {
  disabled: false,
  isSmall: false,
  primaryColor: "#323844",
  secondaryColor: "#17B579",
  textColor: "ffffff",
};

export type { BoostButtonProps };
export { BoostButton };
