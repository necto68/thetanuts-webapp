import type { FC } from "react";

import { Rocket } from "../../shared/icons";

import { Container, HeaderLink, Title } from "./BoostExpander.styles";

export interface BoostExpanderProps {
  title: string;
  onClick?: () => void;
  isBoostEnabledForUser: boolean;
}

export const BoostExpander: FC<BoostExpanderProps> = ({
  title,
  onClick,
  isBoostEnabledForUser,
}) => (
  <Container isBoostEnabledForUser={isBoostEnabledForUser} onClick={onClick}>
    <HeaderLink>
      <Title>{title}</Title>
      <Rocket />
    </HeaderLink>
  </Container>
);
