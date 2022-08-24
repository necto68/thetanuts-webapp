import styled from "styled-components";
import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";

import { PagePathname } from "../types";
import { screens } from "../../shared/constants";

const mapPathnameToBackground = {
  [PagePathname.thetaIndex]: "#031a34",
  [PagePathname.basic]: "#031a34",
  [PagePathname.portfolio]: "#212b31",
};

export const Container = styled(Div100vh)`
  display: flex;

  // height: 100vh; - by default because of Div100vh
`;

export const BackgroundContainer = styled(motion.div).attrs<{
  pathname: PagePathname;
}>(({ pathname }) => ({
  animate: {
    backgroundColor: mapPathnameToBackground[pathname],
  },
}))<{ pathname: PagePathname }>`
  display: flex;
  flex: 1;
  justify-content: center;
  overflow: auto;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-basis: 1330px;

  height: max-content;
  min-height: 100%;

  padding: 15px;

  ${screens.xl} {
    padding: 0;
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
