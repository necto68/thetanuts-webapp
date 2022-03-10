import type { FC } from "react";

import { Info } from "../icons";

import { IconContainer } from "./IconContainer";

interface InfoIconProps {
  theme?: "dark" | "light";
}

export const InfoIcon: FC<InfoIconProps> = ({ theme = "dark" }) => {
  const color = theme === "dark" ? "#061F3A" : "#FFFFFF";

  return (
    <IconContainer color={color} height={16} width={16}>
      <Info />
    </IconContainer>
  );
};
