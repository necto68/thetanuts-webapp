import type { FC } from "react";

import { ArrowBack, Cross, Hamburger } from "../icons";

import { IconContainer } from "./IconContainer";
import type { BaseButtonProps } from "./BaseButton";
import { BaseCircleButton, ContentContainer } from "./CircleButton.styles";

enum CircleButtonIconType {
  cross = "cross",
  hamburger = "hamburger",
  arrowBack = "arrowBack",
}

const buttonIcons = {
  [CircleButtonIconType.cross]: Cross,
  [CircleButtonIconType.hamburger]: Hamburger,
  [CircleButtonIconType.arrowBack]: ArrowBack,
};

interface CircleButtonProps extends BaseButtonProps {
  iconType: CircleButtonIconType;
  iconSize: number;
  className?: string;
}

export const CircleButton: FC<CircleButtonProps> = ({
  primaryColor,
  onClick,
  iconType,
  iconSize,
  className,
}) => {
  const Icon = buttonIcons[iconType];

  return (
    <BaseCircleButton
      // eslint-disable-next-line react/forbid-component-props
      className={className}
      onClick={onClick}
      primaryColor={primaryColor}
    >
      <ContentContainer>
        <IconContainer color={primaryColor} height={iconSize} width={iconSize}>
          <Icon />
        </IconContainer>
      </ContentContainer>
    </BaseCircleButton>
  );
};

export { CircleButtonIconType };
