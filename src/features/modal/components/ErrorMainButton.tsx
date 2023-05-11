import type { FC } from "react";

import type { MutationError } from "../../index-vault-modal/types";

import { ModalMainButton } from "./ModalMainButton.styles";

interface ErrorMainButtonProps {
  error: MutationError;
  onClick: () => void;
}

export const ErrorMainButton: FC<ErrorMainButtonProps> = ({
  error,
  onClick,
}) => {
  const errorMessage = error.data?.message ?? error.message;
  const buttonMessage =
    errorMessage === "execution reverted: 5"
      ? "Not Enough Liquidity"
      : errorMessage;

  return (
    <ModalMainButton
      onClick={onClick}
      primaryColor="#EB5853"
      secondaryColor="#ffffff"
    >
      {buttonMessage}
    </ModalMainButton>
  );
};
