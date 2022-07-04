import { createElement } from "react";
import { AnimatePresence } from "framer-motion";
import { useKey } from "rooks";

import { useViewportHeight } from "../../shared/hooks";
import { useCurrentModalState } from "../hooks/useCurrentModalState";

import { Backdrop, ModalContainer } from "./Modal.styles";

export const Modal = () => {
  const { modalComponent, handleClose } = useCurrentModalState();
  const containerMaxHeight = useViewportHeight(0.98);

  useKey("Escape", handleClose);

  return (
    <AnimatePresence>
      {modalComponent ? (
        <Backdrop>
          <ModalContainer maxHeight={containerMaxHeight}>
            {createElement(modalComponent)}
          </ModalContainer>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  );
};
