import styled from "styled-components";

import { Link } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const LogoLink = styled(Link)`
  display: flex;
  text-decoration: none;
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
  font-size: 17px;
  font-weight: 900;
`;

export const Nuts = styled(AppTitle)`
  font-size: 17px;
  font-weight: 300;
  color: #1fffab;
`;

export const Finance = styled(AppTitle)`
  font-size: 12px;
  font-weight: 300;
`;
