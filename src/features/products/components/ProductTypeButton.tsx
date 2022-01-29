import React, { type FC } from "react";

import { TypeButton, Title } from "./ProductTypeButton.styles";

interface ProductTypeButtonProps {
  active: boolean;
  onClick?: () => void;
}

export const ProductTypeButton: FC<ProductTypeButtonProps> = ({
  active,
  onClick,
  children,
}) => {
  const primaryColor = active ? "#00FF3D" : "#ffffff";

  return (
    <TypeButton
      onClick={onClick}
      primaryColor={primaryColor}
      secondaryColor="#061F3A"
    >
      <Title>{children}</Title>
    </TypeButton>
  );
};
