import type { FC, MutableRefObject } from "react";
import { useBoundingclientrect } from "rooks";
import { AnimatePresence } from "framer-motion";

import { Container } from "./BaseOptionsContainer.styles";

interface BaseOptionsContainerProps {
  isShow: boolean;
  parentReference: MutableRefObject<HTMLDivElement | null>;
}

export const BaseOptionsContainer: FC<BaseOptionsContainerProps> = ({
  isShow,
  children,
  parentReference,
}) => {
  const getBoundingClientRect = useBoundingclientrect(parentReference);

  const { width = 0, height = 0 } = getBoundingClientRect ?? {};

  return (
    <AnimatePresence>
      {isShow ? (
        <Container leftPosition={0} minWidth={width} topPosition={height + 10}>
          {children}
        </Container>
      ) : null}
    </AnimatePresence>
  );
};
