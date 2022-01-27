import React, { FC } from 'react';
import styled from 'styled-components';
import { BaseButton } from '../../shared/components';

interface ProductTypeButtonProps {
  active: boolean;
  onClick?: () => void;
}

export const ProductTypeButton: FC<ProductTypeButtonProps> = ({
  active,
  onClick,
  children,
}) => {
  const primaryColor = active ? '#00FF3D' : '#ffffff';

  return (
    <TypeButton
      onClick={onClick}
      primaryColor={primaryColor}
      secondaryColor={'#061F3A'}
    >
      <Title>{children}</Title>
    </TypeButton>
  );
};

const TypeButton = styled(BaseButton)`
  border: 0;
  border-radius: 30px;
`;

const Title = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 21px;
`;
