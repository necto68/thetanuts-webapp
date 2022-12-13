import styled from "styled-components";
import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";

import { screens } from "../../shared/constants";
import { Link } from "../../shared/components/Link";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled(Div100vh)`
  display: flex;

  // height: 100vh; - by default because of Div100vh
`;

export const BackgroundContainer = styled(motion.div)`
  background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  display: flex;
  flex: 1;
  justify-content: center;
  overflow: auto;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 1330px;

  gap: 8px;

  height: max-content;
  min-height: 100%;

  padding: 0 15px;

  ${screens.xl} {
    padding: 0;
    gap: 0;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  width: 100%;

  grid-template-areas: "sidebar page";
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  gap: 8px;

  ${screens.xl} {
    grid-template-areas:
      "sidebar mobile-header"
      "sidebar page";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    gap: 0;
  }
`;

export const SidebarContainer = styled.div`
  grid-area: sidebar;
  display: flex;
`;

export const MobileHeaderContainer = styled.div`
  grid-area: mobile-header;
  display: none;

  ${screens.xl} {
    display: initial;
  }
`;

export const AnnouncementContainer = styled.div`
  grid-area: announcement;
  display: flex;
  justify-content: center;
  padding: 10px 15px;
  background-color: #1fffab;
`;

export const AnnouncementTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #061f3a;
`;

export const AnnouncementLink = styled(Link)`
  color: #061f3a;
`;

export const PageContainer = styled.div`
  grid-area: page;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  padding: 0;

  ${screens.xl} {
    padding: 15px;
  }
`;
