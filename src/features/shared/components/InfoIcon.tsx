import type { FC } from "react";

import { Info } from "../icons";

import { IconContainer } from "./IconContainer";

interface InfoIconProps {
  theme?: "dark" | "light";
}

export const InfoIcon: FC<InfoIconProps> = ({ theme = "light" }) => {
  const color = theme === "light" ? "#FFFFFF" : "#061F3A";

  return (
    <IconContainer color={color} height={14} width={14}>
      <Info />
    </IconContainer>
  );
};
