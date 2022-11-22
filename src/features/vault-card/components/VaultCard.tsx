import type { FC, ReactNode } from "react";
import type { LocationDescriptor } from "history";

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
  CardLink,
  DataContent,
  SkeletonContainer,
  FooterContent,
} from "./VaultCard.styles";

export interface VaultCardProps {
  isLoading?: boolean;
  disabled?: boolean;
  title: string;
  icon: ReactNode;
  symbol: string;
  subTitle: string;
  apy: string;
  backgroundColor: string;
  shadowColor?: string;
  content?: ReactNode;
  footerContent?: ReactNode;
  link?: LocationDescriptor;
  titleBgColor?: string;
  borderColor?: string;
}

export const VaultCard: FC<VaultCardProps> = ({
  isLoading = false,
  disabled = false,
  title,
  icon,
  symbol,
  subTitle,
  apy,
  backgroundColor,
  shadowColor,
  content,
  footerContent,
  link,
}) => (
  <Container
    backgroundColor={backgroundColor}
    disabled={disabled}
    shadowColor={shadowColor}
  >
    <CardLink to={!disabled && link ? link : {}}>
      <Header>
        {isLoading ? (
          <SkeletonContainer>
            <SkeletonBox height={14} width={60} />
          </SkeletonContainer>
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
                <APYTitle>{`${apy}%`}</APYTitle>
                <SubTitle>APY%</SubTitle>
              </APYContainer>
            )}
          </DataContent>
          {content}
        </DataContainer>
        <FooterContent>{footerContent}</FooterContent>
      </Content>
    </CardLink>
  </Container>
);
