import type { FC } from "react";

import { BaseGradientButton, ButtonTitle } from "./GradientButton.styles";

interface GradientButtonProps {
  title: string;
  backgroundColor: string;
  onClick?: () => void;
}

export const GradientButton: FC<GradientButtonProps> = ({
  title,
  backgroundColor,
  onClick,
}) => (
  <BaseGradientButton backgroundColor={backgroundColor} onClick={onClick}>
    <ButtonTitle>{title}</ButtonTitle>
  </BaseGradientButton>
);
