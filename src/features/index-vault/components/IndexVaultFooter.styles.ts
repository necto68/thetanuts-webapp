import styled from "styled-components";

import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }: Theme<AppTheme>) => theme.brandColor};
  text-align: center;
`;
