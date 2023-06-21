import styled from "styled-components";

import { BaseButton } from "../../shared/components";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

interface IsSmallProps {
  isSmall: boolean;
}

export const Container = styled.div`
  position: relative;
`;

export const CurrentOptionButton = styled(BaseButton)`
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 12px 8px;
  background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  overflow: hidden;
  border: 1px solid #e5e5e5;
  gap: 8px;
`;

export const ButtonContentContainer = styled.div<IsSmallProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ isSmall }) => (isSmall ? "5px" : "10px")};
`;

export const ButtonTitle = styled.span``;

export const ButtonIcon = styled.div``;

export const OptionButton = styled.button`
  border: none;
  padding: 4px;
  font-family: "Roboto";
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  border-radius: 4px;
  background-color: transparent;

  &:hover {
    background-color: #323844;
  }
`;
