import type { FC } from "react";

import { Chain } from "../../shared/icons";

import { Container, HeaderLink, Title } from "./Expander.styles";

export interface ExternalExpanderProps {
  title: string;
  to: string;
}

export const ExternalExpander: FC<ExternalExpanderProps> = ({ title, to }) => (
  <Container>
    <HeaderLink href={to} target="_blank">
      <Title>{title}</Title>
      <Chain />
    </HeaderLink>
  </Container>
);