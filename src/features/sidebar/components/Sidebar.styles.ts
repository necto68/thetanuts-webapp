import styled from "styled-components";
import { motion } from "framer-motion";

import { sizes } from "../../shared/constants";

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
}))<{ isShow: boolean; height: string }>`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px 0;
  background-color: #010c1a;
  height: ${({ height }) => height};

  @media (max-width: ${sizes.md}px) {
    position: fixed;
    z-index: 1;
    width: 100vw;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
`;

export const CircleButtonContainer = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

export const MainNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 0 0 25px;
`;

export const SecondaryNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 25px;
`;

export const IconNavContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 25px;
`;
