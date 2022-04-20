import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "../../shared/components";
import { screens } from "../../shared/constants";

interface LinkProps {
  fontWeight: number;
  color: string;
}

export const SidebarItemContainer = styled.div<{ active: boolean }>`
  display: flex;

  justify-content: space-between;

  ${screens.md} {
    justify-content: start;
  }

  > * {
    fill: ${({ active }) => (active ? "#1fffab" : "#ffffff")};
  }

  > *:hover {
    color: #1fffab;
    fill: #1fffab;
    text-decoration: none;
  }
`;

export const Underline = styled(motion.div).attrs<{ active: boolean }>(
  ({ active }) => ({
    initial: false,

    animate: {
      opacity: active ? 1 : 0,
    },
  })
)<{ active: boolean }>`
  width: 2px;
  border-radius: 1px;
  background-color: #1fffab;
  transform: translateX(2.1rem);
`;

export const SidebarLink = styled(Link)<LinkProps>`
  font-family: Barlow;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: 1.4rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ color }) => color};
  text-transform: uppercase;

  :hover {
    text-decoration: none;
  }
`;
