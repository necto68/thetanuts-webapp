import { IconContainer } from "../../shared/components";
import { AppLogo } from "../icons";

import { AppName, Container } from "./AppSidebarLogo.styles";

export const AppSidebarLogo = () => (
  <Container>
    <IconContainer height={35} width={35}>
      <AppLogo />
    </IconContainer>
    <AppName>
      <strong>Theta</strong>Nuts
    </AppName>
  </Container>
);
