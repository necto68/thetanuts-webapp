import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "../../shared/components";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

import type { VaultCardProps } from "./VaultCard";

type ContainerProps = Pick<
  VaultCardProps,
  "backgroundColor" | "borderColor" | "disabled" | "shadowColor"
>;

interface TitleProps {
  backgroundColor?: VaultCardProps["backgroundColor"];
}

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }: Theme<AppTheme>) => theme.secondaryBgColor};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid ${({ theme }: Theme<AppTheme>) => theme.borderColor};
  overflow: hidden;
`;

export const SkeletonContainer = styled.div`
  padding: 4px;
`;

export const Title = styled.span<TitleProps>`
  font-family: Roboto;
  font-weight: 700;
  font-size: 12px;
  text-align: center;

  width: 100%;
  padding: 4px 0;

  color: ${({ theme }: Theme<AppTheme>) => theme.textColor};
  background-color: ${({
    backgroundColor,
    theme,
  }: Theme<AppTheme> & TitleProps) => backgroundColor ?? theme.transparent};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const FooterContent = styled.div`
  padding: 4px 0;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 2px 8px;
  border-bottom: 1px solid
    ${({ theme }: Theme<AppTheme>) => theme.secondBorderColor};
`;

export const Container = styled(motion.div).attrs<ContainerProps>(
  ({ shadowColor = "", disabled }) => ({
    initial: {
      opacity: 0,
      y: 50,
    },

    animate: {
      opacity: disabled ? 0.6 : 1,
      y: 0,
    },

    whileHover: !disabled && { y: -10, boxShadow: `0 0 20px ${shadowColor}` },

    whileTap: !disabled && {
      scale: 0.97,
      boxShadow: `0 0 10px ${shadowColor}`,
      opacity: 0.8,
    },
  })
)<ContainerProps>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  min-width: 254px;
  background: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  border: 1px solid
    ${({ borderColor, theme }: ContainerProps & Theme<AppTheme>) =>
      borderColor ?? theme.borderColor};
`;

export const DataContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SymbolContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`;

export const APYContainer = styled(SymbolContainer)`
  flex: initial;
  align-items: end;
`;

export const SymbolTitle = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
`;
export const PeriodTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
`;

export const APYTitle = styled(SymbolTitle)`
  background: ${({ theme }: Theme<AppTheme>) => theme.textColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const SubTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  &:visited,
  &:link {
    text-decoration: none;
    color: inherit;
  }
`;
