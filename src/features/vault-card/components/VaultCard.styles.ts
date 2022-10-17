import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "../../shared/components";

import type { VaultCardProps } from "./VaultCard";

type ContainerProps = Pick<
  VaultCardProps,
  "backgroundColor" | "disabled" | "shadowColor"
>;

type APYTitleProps = Pick<VaultCardProps, "backgroundColor">;

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
  padding: 2px;
  border-radius: 8px;
  background: ${({ backgroundColor }) => backgroundColor};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  min-width: 253px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 12px;

  text-align: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  background-color: #010e1d;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 2px 8px;
  border-bottom: 1px solid #5d5d5d;
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

export const APYTitle = styled(SymbolTitle)<APYTitleProps>`
  background: ${({ backgroundColor }) => backgroundColor};
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
