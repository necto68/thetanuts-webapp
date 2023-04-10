import type { FC } from "react";

import { Rocket } from "../../shared/icons";

import {

  DegenPage,

} from "../../sidebar/icons";

import { Container, HeaderLink, Title } from "./BoostExpander.styles";

export interface BoostExpanderProps {
  title: string;
  onClick?: () => void;
  currentPosition: number; // Add currentPosition prop here
  suppliedTokenAddress: string;
  // to: string;
}

export const BoostExpander: FC<BoostExpanderProps> = ({ title, onClick, currentPosition, suppliedTokenAddress }) => (
  <Container currentPosition={currentPosition} suppliedTokenAddress={suppliedTokenAddress} onClick={onClick}>
    <HeaderLink>
      <Title>{title}</Title>
      <Rocket />
    </HeaderLink>
  </Container>
);
