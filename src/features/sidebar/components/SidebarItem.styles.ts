import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "../../shared/components";
import { screens } from "../../shared/constants";

interface LinkProps {
  active: boolean;
}

interface SidebarItemContainerProps {
  active: boolean;
  iconColor: string;
}

export const SidebarItemContainer = styled.div<SidebarItemContainerProps>`
  display: flex;

  justify-content: space-between;

  ${screens.md} {
    justify-content: start;
  }

  > * {
    color: ${({ active, iconColor }) => (active ? iconColor : "#ffffff")};
    fill: ${({ active, iconColor }) => (active ? iconColor : "#ffffff")};
  }

  > *:hover {
    color: ${({ iconColor }) => iconColor};
    fill: ${({ iconColor }) => iconColor};
    text-decoration: none;
  }
`;

export const Underline = styled(motion.div).attrs<SidebarItemContainerProps>(
  ({ active }) => ({
    initial: false,

    animate: {
      opacity: active ? 1 : 0,
    },
  })
)<SidebarItemContainerProps>`
  width: 2px;
  border-radius: 1px;
  background-color: ${({ iconColor }) => iconColor};
  transform: translateX(21px);
`;

export const SidebarLink = styled(Link)<LinkProps>`
  font-family: Barlow;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  font-size: 14px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;

  :hover {
    text-decoration: none;
  }
`;
