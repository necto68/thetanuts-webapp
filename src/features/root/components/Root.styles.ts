import styled from "styled-components";
import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";

import { PagePathname } from "../types";
import { sizes } from "../../shared/constants";

const mapPathnameToBackground = {
  [PagePathname.thetaIndex]:
    "linear-gradient(180deg, #031a34 21.13%, #259ddf 99.41%)",

  [PagePathname.portfolio]:
    "linear-gradient(180deg, #031A34 14.49%, #B6509E 99.41%)",
};

export const Container = styled(Div100vh)`
  display: flex;

  // height: 100vh; - by default because of Div100vh
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
`;

export const PageContainer = styled(motion.div).attrs<{
  pathname: PagePathname;
}>(({ pathname }) => ({
  animate: {
    background: mapPathnameToBackground[pathname],
  },
}))<{ pathname: PagePathname }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  padding: 20px;

  @media (max-width: ${sizes.md}px) {
    padding: 15px;
  }
`;
