import { useLocation } from "react-router-dom";
import { createElement } from "react";

import {
  ThetaIndex,
  Portfolio,
  Twitter,
  Medium,
  Discord,
  Substack,
} from "../icons";
import {
  CircleButton,
  CircleButtonIconType,
  GradientButton,
  IconContainer,
} from "../../shared/components";
import { PagePathname } from "../../root/types";
import { useSidebarState } from "../hooks";
import { useViewportHeight } from "../../shared/hooks";
import { ThetaBasic } from "../icons/ThetaBasic";
import { Analytics } from "../icons/Analytics";
import { Documentation } from "../icons/Documentation";

import {
  CircleButtonContainer,
  IconNavContainer,
  LogoContainer,
  MainNavContainer,
  SecondaryNavContainer,
  SidebarContainer,
  SwitchToV0ButtonContainer,
  SwitchToV0Link,
} from "./Sidebar.styles";
import { AppSidebarLogo } from "./AppSidebarLogo";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { isShow, toggleIsShow } = useSidebarState();

  const mobileHeight = useViewportHeight();

  // navbar items stored here and mapped to JSX later so it is easier to add on
  const mainNavItems = [
    {
      to: PagePathname.thetaIndex,
      linkTitle: "Stronghold",
      navIcon: ThetaIndex,
    },
    {
      to: PagePathname.basic,
      linkTitle: "Basic",
      navIcon: ThetaBasic,
    },
    {
      to: PagePathname.portfolio,
      linkTitle: "Portfolio",
      navIcon: Portfolio,
    },
    {
      to: "https://analytics.thetanuts.finance/",
      linkTitle: "Analytics",
      navIcon: Analytics,
      target: "_blank",
    },
  ];

  const secondaryNavItems = [
    {
      to: "https://docs.thetanuts.finance",
      linkTitle: "Docs",
      navIcon: Documentation,
    },
  ];

  const iconNavItems = [
    {
      to: "https://twitter.com/ThetanutsFi",
      navIcon: Twitter,
      alt: "Twitter",
    },
    {
      to: "https://thetanutsfinance.medium.com",
      navIcon: Medium,
      alt: "Medium",
    },
    {
      to: "https://discord.com/invite/fzWKJSy9v9",
      navIcon: Discord,
      alt: "Discord",
    },
    {
      to: "https://thetanuts.substack.com",
      navIcon: Substack,
      alt: "Substack",
    },
  ];

  return (
    <SidebarContainer isShow={isShow} mobileHeight={mobileHeight}>
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
            target={navItem.target ?? "_self"}
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
      <SwitchToV0ButtonContainer>
        <SwitchToV0Link
          target="_blank"
          to="https://thetanuts.finance/basic/vaults"
        >
          <GradientButton
            backgroundColor="#0A1026"
            title="Switch to Thetanuts v0"
          />
        </SwitchToV0Link>
      </SwitchToV0ButtonContainer>
      <SecondaryNavContainer>
        {secondaryNavItems.map((navItem) => (
          <SidebarItem
            active={navItem.to === pathname}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            target="_blank"
            to={navItem.to}
          />
        ))}
        <IconNavContainer>
          {iconNavItems.map(({ to, navIcon }) => (
            <a href={to} key={to} rel="noreferrer" target="_blank">
              <IconContainer
                color="#ffffff"
                height={22}
                hoverColor="#1fffab"
                width={22}
              >
                {createElement(navIcon)}
              </IconContainer>
            </a>
          ))}
        </IconNavContainer>
      </SecondaryNavContainer>
    </SidebarContainer>
  );
};
