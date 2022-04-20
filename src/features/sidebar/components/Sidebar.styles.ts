import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";
import { Link } from "../../shared/components";

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
  gap: 75px;

  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;
  padding: 25px 20px 25px 25px;

  ${screens.md} {
    background-color: #0a1026;
    border-radius: 0;
    padding: 25px 25px 25px 50px;

    position: fixed;
    z-index: 1;
    width: 100vw;
    height: ${({ mobileHeight }) => mobileHeight};
  }
`;

export const LogoContainer = styled.div`
  display: flex;

  justify-content: center;

  ${screens.md} {
    justify-content: space-between;
  }
`;

export const CircleButtonContainer = styled.div`
  display: none;

  ${screens.md} {
    display: flex;
  }
`;

export const MainNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SecondaryNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const IconNavContainer = styled.div`
  display: flex;
  gap: 20px;
`;
