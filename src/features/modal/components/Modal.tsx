import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useOutsideClickRef } from "rooks";

import { VaultModal } from "../../vault-modal/components";
import { useModalState } from "../../vault-modal/hooks";

import { Backdrop, VaultModalContainer } from "./Modal.styles";

export const Modal = () => {
  const [{ isShow }, setModalState] = useModalState();

  const handleClose = useCallback(() => {
    setModalState((previousState) => ({ ...previousState, isShow: false }));
  }, [setModalState]);

  const [containerReference] = useOutsideClickRef(handleClose);

  return (
    <AnimatePresence>
      {isShow ? (
        <Backdrop>
          <VaultModalContainer ref={containerReference}>
            <VaultModal />
          </VaultModalContainer>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  );
};
