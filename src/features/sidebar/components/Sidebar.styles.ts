import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";
import { Link } from "../../shared/components";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const SidebarContainer = styled(motion.div).attrs<{
  isShow: boolean;
  height: string;
}>(({ isShow }) => ({
  initial: false,

  animate: {
    x: isShow ? 0 : "-100%",

    transition: {
      type: "linear",
    },
  },
}))<{ isShow: boolean; mobileHeight: string }>`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  border-right: 1px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};
  padding: 40px 20px 25px 5px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 180px;
  gap: 48px;

  ${screens.xl} {
    top: 0;
    background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
    border-radius: 0;
    padding: 10px 25px 25px 50px;

    position: fixed;
    z-index: 1;
    width: 100vw;
    height: ${({ mobileHeight }) => mobileHeight};

    max-width: 350px;
  }

  ${screens.md} {
    padding: 10px 15px 25px 25px;
    max-width: inherit;
  }
`;

export const MainNavSeparator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};
`;

export const LogoContainer = styled.div`
  display: flex;

  justify-content: center;

  ${screens.xl} {
    justify-content: space-between;
  }
`;

export const CircleButtonContainer = styled.div`
  display: none;

  ${screens.xl} {
    display: flex;
  }
`;

export const MainNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MainNavTitle = styled.span`
  font-family: Roboto;
  font-size: 12px;
  line-height: 16px;
  color: #949494;
`;

export const SwitchToV0ButtonContainer = styled.div`
  display: none;

  ${screens.md} {
    display: flex;
  }
`;

export const SwitchToV0Link = styled(Link)`
  display: flex;
  text-decoration: none;
`;
