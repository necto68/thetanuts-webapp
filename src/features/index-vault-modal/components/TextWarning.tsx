import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import { Warning } from "../icons";

import { Container, WarningTitle } from "./TextWarning.styles";

interface TextWarningProps {
  text: string;
  size?: number;
}

export const TextWarning: FC<TextWarningProps> = ({ text, size }) => (
  <Container>
    <IconContainer height={14} width={16}>
      <Warning />
    </IconContainer>
    <WarningTitle size={size}>{text}</WarningTitle>
  </Container>
);
