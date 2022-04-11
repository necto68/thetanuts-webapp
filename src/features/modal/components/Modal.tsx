import type { MouseEventHandler } from "react";
import { createElement, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useKey } from "rooks";

import { useViewportHeight } from "../../shared/hooks";
import { useCurrentModalState } from "../hooks";

import { Backdrop, ModalContainer } from "./Modal.styles";

export const Modal = () => {
  const { modalComponent, handleClose } = useCurrentModalState();
  const containerMaxHeight = useViewportHeight(0.98);

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

  return (
    <AnimatePresence>
      {modalComponent ? (
        <Backdrop onMouseDown={handleBackdropMouseDown}>
          <ModalContainer maxHeight={containerMaxHeight}>
            {createElement(modalComponent)}
          </ModalContainer>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  );
};
