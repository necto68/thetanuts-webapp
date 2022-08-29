import type { FC } from "react";

import type { SectionType } from "../types";
import { Plus } from "../../shared/icons";
import { Minus } from "../../shared/icons/Minus";

import {
  Container,
  ExpandableContainer,
  HeaderButton,
  Title,
} from "./Expander.styles";

export interface ExpanderProps {
  type: SectionType;
  title: string;
  isOpen: boolean;
  maxHeight?: number;
  onArrowClick: (sectionType: SectionType) => void;
}

export const Expander: FC<ExpanderProps> = ({
  type,
  title,
  isOpen,
  maxHeight,
  onArrowClick,
  children,
}) => (
  <Container>
    <HeaderButton
      onClick={() => {
        onArrowClick(type);
      }}
    >
      <Title>{title}</Title>
      {isOpen ? <Minus /> : <Plus />}
    </HeaderButton>
    <ExpandableContainer isOpen={isOpen} maxHeight={maxHeight}>
      {children}
    </ExpandableContainer>
  </Container>
);
