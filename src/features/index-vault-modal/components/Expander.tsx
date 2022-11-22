import type { FC, ReactElement, MouseEvent as ReactMouseEvent } from "react";

import type { SectionType } from "../types";
import { ArrowDown, ArrowUp } from "../../shared/icons";

import {
  Container,
  ExpandableContainer,
  HeaderButton,
  Title,
} from "./Expander.styles";

export interface ExpanderProps {
  type: SectionType;
  title: ReactElement | string;
  isOpen: boolean;
  maxHeight?: number;
  isTitleDisabled?: boolean;
  onArrowClick: (sectionType: SectionType) => void;
}

export const Expander: FC<ExpanderProps> = ({
  type,
  title,
  isOpen,
  maxHeight,
  onArrowClick,
  isTitleDisabled,
  children,
}) => {
  const onTitleClick = (event: ReactMouseEvent) => {
    if (isTitleDisabled) {
      event.stopPropagation();
    }
  };

  return (
    <Container isOpen={isOpen}>
      <HeaderButton
        onClick={() => {
          onArrowClick(type);
        }}
      >
        <Title
          onClick={(event) => {
            onTitleClick(event);
          }}
        >
          {title}
        </Title>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </HeaderButton>
      <ExpandableContainer isOpen={isOpen} maxHeight={maxHeight}>
        {children}
      </ExpandableContainer>
    </Container>
  );
};
