import styled from "styled-components";

import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 12px 15px;
  border: 1px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};
`;

export const Input = styled.input`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }: Theme<AppTheme>) => theme.textColor};
  width: 100%;
  padding: 0;
  border: 0;
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: ${({ theme }: Theme<AppTheme>) => theme.textColor};
  }
`;
