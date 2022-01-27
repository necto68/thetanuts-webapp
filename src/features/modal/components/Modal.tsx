import { useCallback } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClickRef } from 'rooks';
import { useModalState } from '../../vault-modal/hooks';
import { VaultModal } from '../../vault-modal/components';

export const Modal = () => {
  const [{ isShow }, setModalState] = useModalState();

  const handleClose = useCallback(() => {
    setModalState((prevState) => ({ ...prevState, isShow: false }));
  }, [setModalState]);

  const [containerRef] = useOutsideClickRef(handleClose);

  return (
    <AnimatePresence>
      {isShow ? (
        <Backdrop>
          <VaultModalContainer ref={containerRef}>
            <VaultModal />
          </VaultModalContainer>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  );
};

const Backdrop = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}))`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const VaultModalContainer = styled(motion.div).attrs(() => ({
  initial: {
    y: '-100%',
  },
  animate: {
    y: 0,
  },
  exit: {
    y: '-120%',
  },
}))``;
