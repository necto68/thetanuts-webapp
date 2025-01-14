import { IconContainer } from "../../shared/components";
import { AppLogo } from "../icons";
import { useSidebarState } from "../hooks";
import { PagePathname } from "../../root/types";

import {
  Container,
  LogoLink,
  TitleContainer,
  Theta,
  Nuts,
  Finance,
} from "./AppSidebarLogo.styles";

export const AppSidebarLogo = () => {
  const { isShow, toggleIsShow } = useSidebarState();

  const closeSidebar = () => {
    if (isShow) {
      toggleIsShow();
    }
  };

  return (
    <LogoLink onClick={closeSidebar} to={PagePathname.basic}>
      <Container>
        <IconContainer height={21} width={180}>
          <AppLogo />
        </IconContainer>
        {/* <TitleContainer>
          <Theta>Theta</Theta>
          <Nuts>Nuts</Nuts>
          <Finance>Finance</Finance>
        </TitleContainer> */}
      </Container>
    </LogoLink>
  );
};
