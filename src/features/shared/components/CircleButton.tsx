import type { FC } from "react";

import { Cross, Hamburger } from "../icons";

import { IconContainer } from "./IconContainer";
import type { BaseButtonProps } from "./BaseButton";
import { BaseCircleButton, ContentContainer } from "./CircleButton.styles";

enum CircleButtonIconType {
  cross = "cross",
  hamburger = "hamburger",
}

const buttonIcons = {
  [CircleButtonIconType.cross]: Cross,
  [CircleButtonIconType.hamburger]: Hamburger,
};

interface CircleButtonProps extends BaseButtonProps {
  iconType: CircleButtonIconType;
  iconSize: number;
}

export const CircleButton: FC<CircleButtonProps> = ({
  primaryColor,
  onClick,
  iconType,
  iconSize,
}) => {
  const Icon = buttonIcons[iconType];

  return (
    <BaseCircleButton onClick={onClick} primaryColor={primaryColor}>
      <ContentContainer>
        <IconContainer color={primaryColor} height={iconSize} width={iconSize}>
          <Icon />
        </IconContainer>
      </ContentContainer>
    </BaseCircleButton>
  );
};

export { CircleButtonIconType };
