import type { FC } from "react";

import { NavigateBack } from "../icons";

import { NavigateButtons } from "./NavigateButtons";

export interface NavigateBackButtonProps {
  onClick?: () => void;
  // to: string;
}

export const NavigateBackButton: FC<NavigateBackButtonProps> = ({ onClick }) => (
  <NavigateButtons onClick={onClick}
    height={24}
    width={24}
  >
    <NavigateBack />
  </NavigateButtons>
);
