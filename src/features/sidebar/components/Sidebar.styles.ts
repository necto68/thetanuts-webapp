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
  background-color: #010c1a;

  height: ${({ height }) => height};
  padding: 50px 25px;

  @media (max-width: ${sizes.md}px) {
    position: fixed;
    z-index: 1;
    width: 100vw;
    padding: 25px 25px 25px 50px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;

  justify-content: center;

  @media (max-width: ${sizes.md}px) {
    justify-content: space-between;
  }
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
`;

export const SecondaryNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SwitchToV0ButtonContainer = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

export const IconNavContainer = styled.div`
  display: flex;
  gap: 16px;
`;
