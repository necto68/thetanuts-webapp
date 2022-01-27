import { FC } from 'react';
import { IconContainer } from './IconContainer';
import { Arrow } from '../icons';

interface ArrowIconProps {
  up: boolean;
}

export const ArrowIcon: FC<ArrowIconProps> = ({ up }) => (
  <IconContainer
    animate={{
      rotate: up ? '180deg' : '0deg',
    }}
    width={12}
    height={7}
  >
    <Arrow />
  </IconContainer>
);
