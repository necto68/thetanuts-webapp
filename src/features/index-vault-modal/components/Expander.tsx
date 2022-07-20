import type { FC } from "react";

import { SectionType } from "../types";
import { Plus, Chain } from "../../shared/icons";

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
      {type === SectionType.analytics ? <Chain /> : <Plus />}
    </HeaderButton>
    <ExpandableContainer isOpen={isOpen} maxHeight={maxHeight}>
      {children}
    </ExpandableContainer>
  </Container>
);
