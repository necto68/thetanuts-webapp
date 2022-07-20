import type { FC } from "react";

import { IconContainer } from "../../shared/components";
import { Warning } from "../icons";

import { Container, WarningTitle } from "./TextWarning.styles";

interface TextWarningProps {
  text: string;
  color?: string;
  size?: number;
}

export const TextWarning: FC<TextWarningProps> = ({ text, size, color }) => (
  <Container>
    <IconContainer color={color} height={14} width={16}>
      <Warning />
    </IconContainer>
    <WarningTitle color={color} size={size}>
      {text}
    </WarningTitle>
  </Container>
);
