import type { FC } from "react";

import { ArrowIcon } from "../../shared/components";

import type { SectionType } from "./ExpandersSection";
import {
  Container,
  HeaderButton,
  Title,
  ExpandableContainer,
} from "./Expander.styles";

interface ExpanderProps {
  type: SectionType;
  title: string;
  isOpen: boolean;
  onArrowClick: (sectionType: SectionType) => void;
}

export const Expander: FC<ExpanderProps> = ({
  type,
  title,
  isOpen,
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
      <ArrowIcon up={isOpen} />
    </HeaderButton>
    <ExpandableContainer isOpen={isOpen}>{children}</ExpandableContainer>
  </Container>
);
