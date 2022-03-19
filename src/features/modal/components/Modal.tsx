import type { MouseEventHandler } from "react";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useKey } from "rooks";

import { IndexVaultModal } from "../../index-vault-modal/components";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import { useViewportHeight } from "../../shared/hooks";

import { Backdrop, VaultModalContainer } from "./Modal.styles";

export const Modal = () => {
  const [{ isShow: isShowIndexVaultModal }, setIndexVaultModalState] =
    useIndexVaultModalState();

  const containerMaxHeight = useViewportHeight(0.98);

  const handleClose = useCallback(() => {
    setIndexVaultModalState((previousState) => ({
      ...previousState,
      isShow: false,
    }));
  }, [setIndexVaultModalState]);

  const handleBackdropMouseDown = useCallback<
    MouseEventHandler<HTMLDivElement>
  >(
    (event) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  useKey("Escape", handleClose);

  const ModalComponent = IndexVaultModal;

  return (
    <AnimatePresence>
      {isShowIndexVaultModal ? (
        <Backdrop onMouseDown={handleBackdropMouseDown}>
          <VaultModalContainer maxHeight={containerMaxHeight}>
            <ModalComponent />
          </VaultModalContainer>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  );
};
