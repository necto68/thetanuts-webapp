import styled from "styled-components";

import { Link } from "../../shared/components";
import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LogoLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

export const AppTitle = styled.span`
  font-family: "Sofia Sans";
  color: #ffffff;
  line-height: 1;
  text-transform: uppercase;
`;

export const TitleContainer = styled.div`
  display: flex;

  ${screens.md} {
    display: none;
  }
`;

export const Theta = styled(AppTitle)`
  font-size: 16px;
  font-weight: 900;
`;

export const Nuts = styled(AppTitle)`
  font-size: 16px;
  font-weight: 300;
  color: #1fffab;
`;

export const Finance = styled(AppTitle)`
  font-size: 12px;
  font-weight: 300;

  ${screens.md} {
    display: none;
  }
`;
