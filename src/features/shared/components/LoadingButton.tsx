import type { FC } from "react";

import { type BaseButtonProps, BaseButton } from "./BaseButton";
import { ContentContainer, Spinner } from "./LoadingButton.styles";

interface LoadingButtonProps extends BaseButtonProps {
  isLoading?: boolean;
}

export const LoadingButton: FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => (
  <BaseButton {...props}>
    <ContentContainer>
      {isLoading && <Spinner color={props.primaryColor ?? "#ffffff"} />}
      {children}
    </ContentContainer>
  </BaseButton>
);
