import { useLocation } from "react-router-dom";
import { createElement } from "react";

import { ThetaIndex, Portfolio, Discord, Twitter } from "../icons";
import {
  CircleButton,
  CircleButtonIconType,
  IconContainer,
} from "../../shared/components";
import { PagePathname } from "../../root/types";
import { useSidebarState } from "../hooks";

import {
  CircleButtonContainer,
  IconNavContainer,
  LogoContainer,
  MainNavContainer,
  SecondaryNavContainer,
  SidebarContainer,
} from "./Sidebar.styles";
import { AppSidebarLogo } from "./AppSidebarLogo";
import { SidebarItem } from "./SidebarItem";
import { SidebarItemSecondary } from "./SidebarItemSecondary";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { isShow, toggleIsShow } = useSidebarState();

  // navbar items stored here and mapped to JSX later so it is easier to add on
  const mainNavItems = [
    {
      to: PagePathname.thetaIndex,
      linkTitle: "THETA INDEX",
      navIcon: ThetaIndex,
    },
    {
      to: PagePathname.portfolio,
      linkTitle: "PORTFOLIO",
      navIcon: Portfolio,
    },
  ];

  const secondaryNavItems = [
    {
      to: "https://thetanuts.gitbook.io/thetanuts/",
      linkTitle: "Docs",
    },
    {
      to: "https://discord.gg/PUjVgMjUPG",
      linkTitle: "Community",
    },
  ];

  const iconNavItems = [
    {
      to: "https://discord.gg/PUjVgMjUPG",
      navIcon: Discord,
      alt: "Discord",
    },
    {
      to: "https://twitter.com/ThetanutsFi",
      navIcon: Twitter,
      alt: "Twitter",
    },
  ];

  return (
    <SidebarContainer isShow={isShow}>
      <LogoContainer>
        <AppSidebarLogo />
        <CircleButtonContainer>
          <CircleButton
            iconSize={13}
            iconType={CircleButtonIconType.cross}
            onClick={toggleIsShow}
            primaryColor="#FFFFFF"
          />
        </CircleButtonContainer>
      </LogoContainer>
      <MainNavContainer>
        {mainNavItems.map((navItem) => (
          <SidebarItem
            active={pathname === navItem.to}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
      <SecondaryNavContainer>
        {secondaryNavItems.map((navItem) => (
          <SidebarItemSecondary
            active={navItem.to === pathname}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            to={navItem.to}
          />
        ))}
      </SecondaryNavContainer>
      <IconNavContainer>
        {iconNavItems.map(({ to, navIcon }) => (
          <a href={to} key={to} rel="noreferrer" target="_blank">
            <IconContainer height={22} width={22}>
              {createElement(navIcon)}
            </IconContainer>
          </a>
        ))}
      </IconNavContainer>
    </SidebarContainer>
  );
};
