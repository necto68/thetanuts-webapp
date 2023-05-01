/* eslint-disable sonarjs/no-identical-functions */
import { useLocation } from "react-router-dom";

import {
  IndexPage,
  BasicPage,
  DegenPage,
  WheelPage,
  Portfolio,
  Twitter,
  Medium,
  Discord,
  Substack,
  TriangleDown,
  TriangleUp,
} from "../icons";
import { CircleButton, CircleButtonIconType } from "../../shared/components";
import { PagePathname } from "../../root/types";
import { useSidebarState } from "../hooks";
import { links } from "../../shared/constants";
import { useViewportHeight } from "../../shared/hooks";
import { Analytics } from "../icons/Analytics";
import { Documentation } from "../icons/Documentation";

import {
  CircleButtonContainer,
  LogoContainer,
  MainNavContainer,
  MainNavSeparator,
  MainNavTitle,
  SidebarContainer,
} from "./Sidebar.styles";
import { AppSidebarLogo } from "./AppSidebarLogo";
import { SidebarItem } from "./SidebarItem";

// navbar items stored here and mapped to JSX later so it is easier to add on
const sellingOptions = [
  {
    to: PagePathname.thetaIndex,
    linkTitle: "Stronghold",
    navIcon: IndexPage,
  },
  {
    to: PagePathname.basic,
    linkTitle: "Basic Vaults",
    navIcon: BasicPage,
  },
];

const buyingOptions = [
  {
    to: PagePathname.long,
    linkTitle: "Calls",
    navIcon: TriangleUp,
  },
  {
    to: PagePathname.long,
    linkTitle: "Puts",
    navIcon: TriangleDown,
  },
];

const exoticOptions = [
  {
    to: PagePathname.degen,
    linkTitle: "Degen Vaults",
    navIcon: DegenPage,
    iconColor: "#EB5353",
  },
  {
    to: PagePathname.wheel,
    linkTitle: "Wheel Vaults",
    navIcon: WheelPage,
  },
];

const tools = [
  {
    to: PagePathname.portfolio,
    linkTitle: "Portfolio",
    navIcon: Portfolio,
  },
  {
    to: links.analytics,
    linkTitle: "Analytics",
    navIcon: Analytics,
    target: "_blank",
  },
];

const documentation = [
  {
    to: links.docs,
    linkTitle: "DOCS",
    navIcon: Documentation,
  },
];

const socials = [
  {
    to: links.twitter,
    navIcon: Twitter,
    alt: "Twitter",
    linkTitle: "Twitter",
  },
  {
    to: links.medium,
    navIcon: Medium,
    alt: "Medium",
    linkTitle: "Medium",
  },
  {
    to: links.discord,
    navIcon: Discord,
    alt: "Discord",
    linkTitle: "Discord",
  },
  {
    to: links.substack,
    navIcon: Substack,
    alt: "Substack",
    linkTitle: "Substack",
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { isShow, toggleIsShow } = useSidebarState();

  const mobileHeight = useViewportHeight();

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
        <MainNavTitle>Short Options</MainNavTitle>
        {sellingOptions.map((navItem) => (
          <SidebarItem
            active={pathname === navItem.to}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
      <MainNavContainer>
        <MainNavTitle>Long Options</MainNavTitle>
        {buyingOptions.map((navItem) => (
          <SidebarItem
            active={pathname === navItem.to}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
      <MainNavContainer>
        <MainNavTitle>Exotic Options</MainNavTitle>
        {exoticOptions.map((navItem) => (
          <SidebarItem
            active={pathname === navItem.to}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
      <MainNavContainer>
        <MainNavTitle>Tools</MainNavTitle>
        {tools.map((navItem) => (
          <SidebarItem
            active={pathname === navItem.to}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            target={navItem.target}
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
      <MainNavSeparator />
      <MainNavContainer>
        {documentation.map((navItem) => (
          <SidebarItem
            active={navItem.to === pathname}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            target="_blank"
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
      <MainNavContainer>
        <MainNavTitle>Socials</MainNavTitle>
        {socials.map((navItem) => (
          <SidebarItem
            active={pathname === navItem.to}
            key={navItem.linkTitle}
            linkTitle={navItem.linkTitle}
            navIcon={navItem.navIcon}
            target="_blank"
            to={navItem.to}
          />
        ))}
      </MainNavContainer>
    </SidebarContainer>
  );
};
