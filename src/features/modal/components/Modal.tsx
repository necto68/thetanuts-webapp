import type { MouseEventHandler } from "react";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useKey } from "rooks";

import { VaultModal } from "../../vault-modal/components";
import { useModalState } from "../../vault-modal/hooks";
import { IndexVaultModal } from "../../index-vault-modal/components";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";

import { Backdrop, VaultModalContainer } from "./Modal.styles";

export const Modal = () => {
  const [{ isShow: isShowModal }, setModalState] = useModalState();
  const [{ isShow: isShowIndexVaultModal }, setIndexVaultModalState] =
    useIndexVaultModalState();

  const handleClose = useCallback(() => {
    setModalState((previousState) => ({ ...previousState, isShow: false }));
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setModalState, setIndexVaultModalState]);

  const handleBackdropClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  useKey("Escape", handleClose);

  const ModalComponent = isShowModal ? VaultModal : IndexVaultModal;

  return (
    <AnimatePresence>
      {isShowModal || isShowIndexVaultModal ? (
        <Backdrop onClick={handleBackdropClick}>
          <VaultModalContainer>
            <ModalComponent />
          </VaultModalContainer>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  );
};
