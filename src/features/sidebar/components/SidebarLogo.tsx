import { IconContainer } from "../../shared/components";
import { AppLogo } from "../icons";

import { AppName, SidebarLogoContainer } from "./SidebarLogo.styles";

export const SidebarLogo = () => (
  <SidebarLogoContainer>
    <IconContainer height={35} width={35}>
      <AppLogo />
    </IconContainer>
    <AppName>
      <strong>Theta</strong>Nuts
    </AppName>
  </SidebarLogoContainer>
);
