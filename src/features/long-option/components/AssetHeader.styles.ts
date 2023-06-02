import styled from "styled-components";

import type { AppTheme, Theme } from "../../app/constants/appTheme";

import { ComponentContainer } from "./LongOptionContent.styles";

interface PriceChangeTitleProps {
  isPositive: boolean;
}

export const Container = styled(ComponentContainer)`
  flex: 1;
  gap: 32px;
  align-items: center;
  padding: 12px 24px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PricesContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

export const Title = styled.span`
  font-family: "Roboto";
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
`;

export const SubTitle = styled.span`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 12px;
  color: #a6b0c7;
`;

export const PriceTitle = styled(Title)`
  font-size: 16px;
`;

export const PriceChangeTitle = styled(PriceTitle)<PriceChangeTitleProps>`
  color: ${({ isPositive, theme }: PriceChangeTitleProps & Theme<AppTheme>) =>
    isPositive ? "#12CC86" : theme.warningColor};
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
