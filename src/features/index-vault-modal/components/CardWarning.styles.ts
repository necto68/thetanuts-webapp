import styled from "styled-components";

import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 8px 8px 16px;
  border-radius: 50px;
  gap: 4px;
  border: 1px solid ${({ theme }: Theme<AppTheme>) => theme.warningColor};
  background-color: ${({ theme }: Theme<AppTheme>) =>
    theme.modalSecondaryBgColor};
`;
