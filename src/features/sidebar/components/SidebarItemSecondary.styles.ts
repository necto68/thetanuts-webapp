import styled from "styled-components";

import Link from "../../shared/components/Link";

interface Colored {
  color: string;
}

export const SidebarItemSecondaryContainer = styled.div`
  display: flex;

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
  gap: 20px;
  color: ${({ color }) => color};

  :hover {
    text-decoration: none;
  }
`;
