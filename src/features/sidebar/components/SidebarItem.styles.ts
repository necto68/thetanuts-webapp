import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "../../shared/components";
import { sizes } from "../../shared/constants";

interface Colored {
  color: string;
}

export const SidebarItemContainer = styled.div<{ active: boolean }>`
  display: flex;

  justify-content: space-between;

  @media (max-width: ${sizes.md}px) {
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
  transform: translateX(26px);
`;

export const SidebarLink = styled(Link)<Colored>`
  font-family: Barlow;
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ color }) => color};
  text-transform: uppercase;

  :hover {
    text-decoration: none;
  }
`;
