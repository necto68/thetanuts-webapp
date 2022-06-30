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
    <LogoLink onClick={closeSidebar} to={PagePathname.thetaIndex}>
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
    </LogoLink>
  );
};
