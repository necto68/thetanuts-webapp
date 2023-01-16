import styled from "styled-components";

import type { AppTheme, Theme } from "../../app/constants/appTheme";

interface TitleProps extends Theme<AppTheme> {
  isActive: boolean;
}

export const Title = styled.span<TitleProps>`
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  color: ${({ isActive, theme }: TitleProps) =>
    isActive ? theme.brandColor : "#a6b0c7"};
`;
