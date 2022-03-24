import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  flex-direction: column;

  @media (max-width: ${sizes.md}px) {
    flex-direction: row;
  }
`;

export const AppTitle = styled.span`
  font-family: "Sofia Sans";
  color: #ffffff;
  text-transform: uppercase;
`;

export const TitleContainer = styled.div`
  display: flex;
`;

export const Theta = styled(AppTitle)`
  font-weight: 900;

  font-size: 21px;

  @media (max-width: ${sizes.md}px) {
    font-size: 17px;
  }
`;

export const Nuts = styled(AppTitle)`
  font-weight: 300;
  color: #1bf9a7;

  font-size: 21px;

  @media (max-width: ${sizes.md}px) {
    font-size: 17px;
  }
`;

export const Finance = styled(AppTitle)`
  font-weight: 300;

  font-size: 15px;

  @media (max-width: ${sizes.md}px) {
    font-size: 12px;
  }
`;
