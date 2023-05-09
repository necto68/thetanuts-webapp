import type { FC } from "react";

import { NavigateBack } from "../icons";

import { NavigateButtons } from "./NavigateButtons";

export interface NavigateBackButtonProps {
  onClick?: () => void;

  // to: string;
}

export const NavigateBackButton: FC<NavigateBackButtonProps> = ({
  onClick,
}) => (
  <NavigateButtons height={24} onClick={onClick} width={24}>
    <NavigateBack />
  </NavigateButtons>
);
