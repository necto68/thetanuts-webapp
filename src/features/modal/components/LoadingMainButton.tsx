import type { FC } from "react";

import { LoadingSpinner } from "../../shared/components";

import { ContentContainer, ModalMainButton } from "./ModalMainButton.styles";

export const LoadingMainButton: FC = ({ children }) => (
  <ModalMainButton disabled primaryColor="#12CC86" secondaryColor="#ffffff">
    <ContentContainer>
      {children}
      <LoadingSpinner />
    </ContentContainer>
  </ModalMainButton>
);
