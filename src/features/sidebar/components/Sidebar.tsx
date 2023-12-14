import {
  IndexPage,
  BasicPage,
  DegenPage,
  WheelPage,
  LongPage,

  // LongTradePage,
  Portfolio,
  Twitter,
  Medium,
  Discord,
  Substack,
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
  MainNavSeparator,
  SidebarContainer,
} from "./Sidebar.styles";
import { AppSidebarLogo } from "./AppSidebarLogo";
import { MainNavSection } from "./MainNavSection";

// navbar items stored here and mapped to JSX later so it is easier to add on
// const shortOptions = [
//   {
//     to: PagePathname.thetaIndex,
//     linkTitle: "Stronghold",
//     navIcon: IndexPage,
//   },
//   {
//     to: PagePathname.basic,
//     linkTitle: "Basic Vaults",
//     navIcon: BasicPage,
//   },
// ];

// const longOptions = [
//   {
//     to: PagePathname.long,
//     linkTitle: "Long Vaults",
//     navIcon: LongPage,
//   },

// TODO: uncomment when ready to deploy long trade
// {
//   to: PagePathname.longTrade,
//   linkTitle: "Trade Long",
//   navIcon: LongTradePage,
// },
// ];

const exoticStrategies = [
  {
    to: PagePathname.basic,
    linkTitle: <span style={{ paddingRight: "20px" }}>Basic Vaults</span>,
    navIcon: BasicPage,
    iconColor: "#1fffab",
  },
  {
    to: PagePathname.wheel,
    linkTitle: <span style={{ paddingRight: "20px" }}>Wheel Vaults</span>,
    navIcon: WheelPage,
    iconColor: "#1fffab",
  },
  {
    to: PagePathname.thetaIndex,

    linkTitle: (
      <span style={{ paddingRight: "20px" }}>Stronghold (Withdraw Only)</span>
    ),

    navIcon: IndexPage,
    iconColor: "#1fffab",
  },
  {
    to: PagePathname.long,

    linkTitle: (
      <span style={{ paddingRight: "20px" }}>Long Vaults (Withdraw Only)</span>
    ),

    navIcon: LongPage,
    iconColor: "#1fffab",
  },
  {
    to: PagePathname.degen,
    linkTitle: "Degen Vaults (Withdraw Only)",
    navIcon: DegenPage,
    iconColor: "#1fffab",
  },
];

const tools = [
  {
    to: PagePathname.portfolio,
    linkTitle: "Portfolio",
    navIcon: Portfolio,
  },
  // {
  //   to: links.analytics,
  //   linkTitle: "Analytics",
  //   navIcon: Analytics,
  //   target: "_blank",
  // },
];

// const documentation = [
//   {
//     to: links.docs,
//     linkTitle: "DOCS",
//     navIcon: Documentation,
//     target: "_blank",
//   },
// ];

// const socials = [
//   {
//     to: links.twitter,
//     linkTitle: "Twitter",
//     navIcon: Twitter,
//     target: "_blank",
//   },
//   {
//     to: links.medium,
//     linkTitle: "Medium",
//     navIcon: Medium,
//     target: "_blank",
//   },
//   {
//     to: links.discord,
//     linkTitle: "Discord",
//     navIcon: Discord,
//     target: "_blank",
//   },
//   {
//     to: links.substack,
//     linkTitle: "Substack",
//     navIcon: Substack,
//     target: "_blank",
//   },
// ];

const newDapp = [
  {
    to: "https://app.thetanuts.finance/",
    linkTitle: "Access Thetanuts Finance v3",
    navIcon: LongPage,
  },
];

export const Sidebar = () => {
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
            primaryColor="#1fffab"
          />
        </CircleButtonContainer>
      </LogoContainer>
      <MainNavSection navItems={exoticStrategies} title="Legacy Products" />
      <MainNavSection navItems={tools} title="Tools" />
      <MainNavSection navItems={newDapp} title="Thetanuts Finance v3 Upgrade" />
    </SidebarContainer>
  );
};
