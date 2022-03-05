import type { FC, MutableRefObject } from "react";
import { useOutsideClickRef, useBoundingclientrect } from "rooks";
import { AnimatePresence } from "framer-motion";

import { Container } from "./BaseOptionsContainer.styles";

interface BaseOptionsContainerProps {
  isShow: boolean;
  onClose: () => void;
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const BaseOptionsContainer: FC<BaseOptionsContainerProps> = ({
  isShow,
  onClose,
  children,
  parentRef: parentReference,
}) => {
  const [containerReference] = useOutsideClickRef(onClose);
  const getBoundingClientRect = useBoundingclientrect(parentReference);

  const { width = 0, height = 0 } = getBoundingClientRect ?? {};

  return (
    <AnimatePresence>
      {isShow ? (
        <Container
          leftPosition={0}
          minWidth={width}
          ref={containerReference}
          topPosition={height + 10}
        >
          {children}
        </Container>
      ) : null}
    </AnimatePresence>
  );
};
