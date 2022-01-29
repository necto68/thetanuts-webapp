import type { FC, MutableRefObject } from "react";
import { useOutsideClickRef, useBoundingclientrect } from "rooks";
import { AnimatePresence } from "framer-motion";

import { Container } from "./BaseOptionsContainer.styles";

interface BaseOptionsContainerProps {
  show: boolean;
  onClose: () => void;
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export const BaseOptionsContainer: FC<BaseOptionsContainerProps> = ({
  show,
  onClose,
  children,
  parentRef: parentReference,
}) => {
  const [containerReference] = useOutsideClickRef(onClose);
  const getBoundingClientRect = useBoundingclientrect(parentReference);

  const topPosition = getBoundingClientRect?.top ?? 0;
  const leftPosition = getBoundingClientRect?.left ?? 0;
  const height = getBoundingClientRect?.height ?? 0;

  return (
    <AnimatePresence>
      {show ? (
        <Container
          leftPosition={leftPosition}
          ref={containerReference}
          topPosition={topPosition + height + 10}
        >
          {children}
        </Container>
      ) : null}
    </AnimatePresence>
  );
};
