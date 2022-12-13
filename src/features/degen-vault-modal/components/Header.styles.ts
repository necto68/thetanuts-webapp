import styled from "styled-components";

import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 22px;
  color: ${({ theme }: Theme<AppTheme>) => theme.warningColor};
  text-align: center;
`;

export const APYContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const APYContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const APYTitle = styled.span`
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  color: #a6b0c7;
  text-align: center;
`;

export const APYValue = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 25px;
  color: #ffffff;
  text-align: center;
`;
