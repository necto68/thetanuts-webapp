import type { FC } from "react";

import type { MutationError } from "../../index-vault-modal/types";

import { ModalMainButton } from "./MainModalButton.styles";

interface ErrorMainButtonProps {
  error: MutationError;
  onClick: () => void;
}

export const ErrorMainButton: FC<ErrorMainButtonProps> = ({
  error,
  onClick,
}) => (
  <ModalMainButton
    onClick={onClick}
    primaryColor="#EB5853"
    secondaryColor="#ffffff"
  >
    {error.data?.message ?? error.message}
  </ModalMainButton>
);
