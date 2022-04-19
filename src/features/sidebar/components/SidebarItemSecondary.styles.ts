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
  font-size: 1.4rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 2rem;
  color: ${({ color }) => color};

  :hover {
    text-decoration: none;
  }
`;
