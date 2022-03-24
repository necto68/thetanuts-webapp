import { IconContainer } from "../../shared/components";
import { AppLogo } from "../icons";

import {
  Container,
  TitleContainer,
  Theta,
  Nuts,
  Finance,
} from "./AppSidebarLogo.styles";

export const AppSidebarLogo = () => (
  <Container>
    <IconContainer height={30} width={30}>
      <AppLogo />
    </IconContainer>
    <TitleContainer>
      <Theta>Theta</Theta>
      <Nuts>Nuts</Nuts>
    </TitleContainer>
    <Finance>Finance</Finance>
  </Container>
);
