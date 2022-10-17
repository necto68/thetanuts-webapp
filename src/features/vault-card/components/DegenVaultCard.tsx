import type { FC } from "react";

import { IconContainer } from "../../shared/components";

import {
  Container,
  Content,
  Header,
  SymbolTitle,
  CardLink,
} from "./VaultCard.styles";
import {
  DataContainer,
  Title,
  DataContent,
  DataItemContainer,
  APYContainer,
  APYTitle,
  APYValue,
  SymbolContainer,
  SubTitle,
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
  subTitle,
  weeklyYield,
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
        <Title>{title}</Title>
      </Header>
      <Content>
        <DataContainer>
          <DataContent>
            <DataItemContainer>
              <APYContainer>
                <APYTitle>Weekly Yield</APYTitle>
                <APYValue
                  backgroundColor={backgroundColor}
                >{`${weeklyYield}%`}</APYValue>
              </APYContainer>
              <APYContainer>
                <APYTitle>APY</APYTitle>
                <APYValue
                  backgroundColor={backgroundColor}
                >{`${apy}%`}</APYValue>
              </APYContainer>
            </DataItemContainer>
            <DataItemContainer>
              <SymbolContainer>
                <IconContainer height={25} width={25}>
                  {icon}
                </IconContainer>
                <SymbolTitle>{symbol}</SymbolTitle>
              </SymbolContainer>
              <SubTitle>{subTitle}</SubTitle>
            </DataItemContainer>
          </DataContent>
          {content}
        </DataContainer>
        {footerContent}
      </Content>
    </CardLink>
  </Container>
);
