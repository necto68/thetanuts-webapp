import styled from "styled-components";

import { screens } from "../../shared/constants";
import type { AppTheme, Theme } from "../../app/constants/appTheme";
import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  border-radius: 10px;
  background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  overflow-x: hidden;
  overflow-y: auto;

  gap: 30px;
  padding: 30px 40px;

  ${screens.md} {
    gap: 20px;
    padding: 15px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${BaseButton} {
    height: 40px;
    width: 200px;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
  }
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin: 0;

  font-size: 22px;
  line-height: 28px;

  ${screens.md} {
    font-size: 16px;
  }
`;

export const Subtitle = styled.h2`
  font-family: Roboto;
  font-weight: 500;
  color: #ffffff;
  margin: 0;

  font-size: 14px;
  line-height: 20px;
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
  margin: 0;
`;

export const ListItem = styled.li`
  font-family: Roboto;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;

export const Link = styled.a`
  text-decoration: underline;
  &:visited {
    color: #ffffff;
  }
`;
