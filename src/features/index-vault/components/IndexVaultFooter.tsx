import type { FC } from "react";

import { Container, Title } from "./IndexVaultFooter.styles";

interface IndexVaultFooterProps {
  title: string;
}

export const IndexVaultFooter: FC<IndexVaultFooterProps> = ({ title }) => (
  <Container>
    <Title>{title}</Title>
  </Container>
);
