import styled from "styled-components";

import { BaseButton, Link } from "../../shared/components";

export const BaseSwitchToV0Link = styled(Link)`
  display: flex;
  text-decoration: none;
`;

export const BaseSwitchToV0Button = styled(BaseButton)`
  border: 0;
  background: linear-gradient(
      90deg,
      #04feb1 -22.19%,
      #d9ef46 19.09%,
      #ff9635 58.71%,
      #a2f9e9 95.86%,
      #04feb1 136.29%
    )
    border-box;

  font-family: Sofia Sans;
  font-weight: 900;
`;
