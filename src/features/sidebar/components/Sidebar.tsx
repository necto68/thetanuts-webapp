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
    linkTitle: "Basic Vaults",
    navIcon: BasicPage,
  },
  {
    to: PagePathname.thetaIndex,
    linkTitle: "Stronghold",
    navIcon: IndexPage,
  },
  {
    to: PagePathname.long,
    linkTitle: "Long Vaults",
    navIcon: LongPage,
  },
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

// const tools = [
//   {
//     to: PagePathname.portfolio,
//     linkTitle: "Portfolio",
//     navIcon: Portfolio,
//   },
//   {
//     to: links.analytics,
//     linkTitle: "Analytics",
//     navIcon: Analytics,
//     target: "_blank",
//   },
// ];

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
            primaryColor="#FFFFFF"
          />
        </CircleButtonContainer>
      </LogoContainer>
      {/* <MainNavSection navItems={shortOptions} title="Short Options" /> */}
      <MainNavSection navItems={exoticStrategies} title="Legacy" />
      {/* <MainNavSection navItems={tools} title="Tools" /> */}
      {/* <MainNavSeparator /> */}
      <MainNavSection navItems={newDapp} title="v3 Upgrade" />
      {/* <MainNavSection navItems={documentation} />
      <MainNavSection navItems={socials} title="Socials" /> */}
    </SidebarContainer>
  );
};
