import type { FC } from "react";

import { IconContainer } from "../../shared/components";

import {
  Container,
  Content,
  SymbolTitle,
  CardLink,
  PeriodTitle,
  FooterContent,
} from "./VaultCard.styles";
import {
  DataContainer,
  Header,
  Title,
  DataContent,
  DataItemContainer,
  APYContainer,
  APYTitle,
  APYValue,
  SymbolContainer,
  TextContainer,
} from "./DegenVaultCard.styles";
import type { VaultCardProps } from "./VaultCard";

export interface DegenVaultCardProps extends VaultCardProps {
  weeklyYield: VaultCardProps["apy"];
}

export const DegenVaultCard: FC<DegenVaultCardProps> = ({
  disabled = false,
  title,
  icon,
  symbol,
  apy,
  backgroundColor,
  shadowColor,
  borderColor,
  content,
  footerContent,
  link,
}) => (
  <Container
    backgroundColor={backgroundColor}
    borderColor={borderColor}
    disabled={disabled}
    shadowColor={shadowColor}
  >
    <CardLink to={!disabled && link ? link : {}}>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        <DataContainer>
          <DataContent>
            <DataItemContainer>
              <SymbolContainer>
                <IconContainer height={25} width={25}>
                  {icon}
                </IconContainer>
                <TextContainer>
                  <SymbolTitle>{symbol}</SymbolTitle>
                  <PeriodTitle>Weekly</PeriodTitle>
                </TextContainer>
              </SymbolContainer>
              <APYContainer>
                <APYValue>{`${apy}%`}</APYValue>
                <APYTitle>APY</APYTitle>
              </APYContainer>
            </DataItemContainer>
          </DataContent>
          {content}
        </DataContainer>
        <FooterContent>{footerContent}</FooterContent>
      </Content>
    </CardLink>
  </Container>
);
