import styled from "styled-components";

import { BaseButton } from "./BaseButton";

export const BaseGradientButton = styled(BaseButton)<{
  backgroundColor: string;
}>`
  border: 2px solid transparent;
  padding: 7px 20px;

  background: ${({ backgroundColor }) =>
      `linear-gradient(${backgroundColor}, ${backgroundColor}) padding-box`},
    linear-gradient(
        90deg,
        #04feb1 -22.19%,
        #d9ef46 19.09%,
        #ff9635 58.71%,
        #a2f9e9 95.86%,
        #04feb1 136.29%
      )
      border-box;
`;

export const ButtonTitle = styled.span`
  font-family: "Sofia Sans";
  font-weight: 900;
  font-size: 20px;

  background: linear-gradient(
    90deg,
    #04feb1 -22.19%,
    #d9ef46 19.09%,
    #ff9635 58.71%,
    #a2f9e9 95.86%,
    #04feb1 136.29%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;
