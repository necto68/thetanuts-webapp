import { FC, MutableRefObject } from 'react';
import styled from 'styled-components';
import { useOutsideClickRef, useBoundingclientrect } from 'rooks';
import { motion, AnimatePresence } from 'framer-motion';

interface BaseOptionsContainerProps {
  show: boolean;
  onClose: () => void;
  parentRef: MutableRefObject<any>;
}

interface ContainerProps {
  top: number;
  left: number;
}

export const BaseOptionsContainer: FC<BaseOptionsContainerProps> = ({
  show,
  onClose,
  children,
  parentRef,
}) => {
  const [containerRef] = useOutsideClickRef(onClose);
  const getBoundingClientRect = useBoundingclientrect(parentRef);

  const top = getBoundingClientRect?.top ?? 0;
  const left = getBoundingClientRect?.left ?? 0;
  const height = getBoundingClientRect?.height ?? 0;

  return (
    <AnimatePresence>
      {show ? (
        <Container ref={containerRef} top={top + height + 10} left={left}>
          {children}
        </Container>
      ) : null}
    </AnimatePresence>
  );
};

const Container = styled(motion.div).attrs(() => ({
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: { y: 30, opacity: 0 },
}))<ContainerProps>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: 1;
`;
