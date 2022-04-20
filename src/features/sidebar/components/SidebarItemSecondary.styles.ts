import styled from "styled-components";

import { Link } from "../../shared/components";

interface Colored {
  color: string;
}

export const SidebarItemSecondaryContainer = styled.div`
  display: flex;

  > *:hover {
    color: #1fffab;
    fill: #1fffab;
    text-decoration: none;
  }
`;

export const SidebarLink = styled(Link)<Colored>`
  font-family: Barlow;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 20px;
  color: ${({ color }) => color};

  :hover {
    text-decoration: none;
  }
`;
