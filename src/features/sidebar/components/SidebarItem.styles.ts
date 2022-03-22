import styled from "styled-components";

import { Link } from "../../shared/components";

interface Colored {
  color: string;
}

export const SidebarItemContainer = styled.div<{ active: boolean }>`
  display: flex;
  padding: 0 25px;
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: ${({ active }) => (active ? "#81e429" : "transparent")};

  > * {
    fill: ${({ active }) => (active ? "#81e429" : "#ffffff")};
  }

  > *:hover {
    color: #81e429;
    fill: #81e429;
    text-decoration: none;
  }
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

  :hover {
    text-decoration: none;
  }
`;
