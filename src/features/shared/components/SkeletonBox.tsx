import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
to {
  transform: translateX(100%);
}`;

export const SkeletonBox = styled.div<{ width?: number; height?: number }>`
  display: flex;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  border-radius: 5px;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: ${shimmer} 2s infinite;
    content: '';
  }
`;
