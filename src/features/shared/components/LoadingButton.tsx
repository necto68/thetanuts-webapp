import { FC } from 'react';
import styled from 'styled-components';
import { BaseButton, BaseButtonProps } from './BaseButton';
import { motion } from 'framer-motion';

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
      {isLoading && <Spinner color={props.primaryColor || '#ffffff'} />}
      {children}
    </ContentContainer>
  </BaseButton>
);

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

interface Colored {
  color: string;
}

const Spinner = styled(motion.div).attrs<Colored>(() => ({
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    rotate: 360,
  },
  transition: {
    rotate: {
      repeat: Infinity,
      duration: 1,
    },
  },
  exit: {
    scale: 0,
  },
}))<Colored>`
  width: 18px;
  height: 18px;
  border: 3px solid;
  border-color: ${({ color }) => color} transparent ${({ color }) => color}
    transparent;
  border-radius: 50%;
`;
