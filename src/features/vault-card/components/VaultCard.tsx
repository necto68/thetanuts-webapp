import type { FC, ReactNode } from "react";

import { IconContainer, SkeletonBox } from "../../shared/components";

import {
  Title,
  Container,
  Content,
  Header,
  DataContainer,
  SymbolContainer,
  APYContainer,
  SymbolTitle,
  APYTitle,
  SubTitle,
  DataContent,
} from "./VaultCard.styles";

export interface VaultCardProps {
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title: string;
  icon: ReactNode;
  symbol: string;
  subTitle: string;
  apy: string;
  backgroundColor: string;
  shadowColor?: string;
  content?: ReactNode;
  footerContent?: ReactNode;
}

export const VaultCard: FC<VaultCardProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  title,
  icon,
  symbol,
  subTitle,
  apy,
  backgroundColor,
  shadowColor,
  content,
  footerContent,
}) => (
  <Container
    backgroundColor={backgroundColor}
    disabled={disabled}
    onClick={onClick}
    shadowColor={shadowColor}
  >
    <Header>
      {isLoading ? (
        <SkeletonBox height={14} width={60} />
      ) : (
        <Title>{title}</Title>
      )}
    </Header>
    <Content>
      <DataContainer>
        <DataContent>
          <IconContainer height={35} width={24}>
            {icon}
          </IconContainer>
          {isLoading ? (
            <SymbolContainer>
              <SkeletonBox height={18} width={60} />
              <SkeletonBox height={14} width={60} />
            </SymbolContainer>
          ) : (
            <SymbolContainer>
              <SymbolTitle>{symbol}</SymbolTitle>
              <SubTitle>{subTitle}</SubTitle>
            </SymbolContainer>
          )}
          {isLoading ? (
            <APYContainer>
              <SkeletonBox height={18} width={60} />
              <SkeletonBox height={14} width={60} />
            </APYContainer>
          ) : (
            <APYContainer>
              <APYTitle backgroundColor={backgroundColor}>{`${apy}%`}</APYTitle>
              <SubTitle>APY%</SubTitle>
            </APYContainer>
          )}
        </DataContent>
        {content}
      </DataContainer>
      {footerContent}
    </Content>
  </Container>
);
