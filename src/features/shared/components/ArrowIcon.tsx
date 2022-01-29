import type { FC } from "react";

import { Arrow } from "../icons";

import { IconContainer } from "./IconContainer";

interface ArrowIconProps {
  up: boolean;
}

export const ArrowIcon: FC<ArrowIconProps> = ({ up }) => (
  <IconContainer
    animate={{
      rotate: up ? "180deg" : "0deg",
    }}
    height={7}
    width={12}
  >
    <Arrow />
  </IconContainer>
);
