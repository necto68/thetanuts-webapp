import logo from "../../../assets/images/logo.png";

import { AppName, SidebarLogoContainer } from "./SidebarLogo.styles";

export const SidebarLogo = () => (
  <SidebarLogoContainer>
    <img alt="Logo" height="46px" src={logo} width="49px" />
    <AppName>
      <strong>Theta</strong>Nuts
    </AppName>
  </SidebarLogoContainer>
);
