import type { FC } from "react";

import { ModalMainButton } from "./MainModalButton.styles";

interface ActionMainButtonProps {
  onClick: () => void;
}

export const ActionMainButton: FC<ActionMainButtonProps> = ({
  onClick,
  children,
}) => (
  <ModalMainButton
    onClick={onClick}
    primaryColor="#12CC86"
    secondaryColor="#ffffff"
  >
    {children}
  </ModalMainButton>
);
