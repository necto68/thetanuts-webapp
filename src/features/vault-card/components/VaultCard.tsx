import type { FC, ReactNode } from "react";

import { IconContainer, SkeletonBox } from "../../shared/components";

import {
  LeftDataContainer,
  LeftDataValue,
  Title,
  TitleContainer,
  Container,
  Content,
  DataTitle,
  RightDataValue,
  Header,
  ButtonContainer,
  ButtonTitle,
  RightDataContainer,
  SubTitle,
} from "./VaultCard.styles";

export interface VaultCardProps {
  isLoading?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  title: string;
  subTitle: string;
  onClick?: () => void;
  leftDataTitle: string;
  leftDataValue: string;
  rightDataTitle: string;
  rightDataValue: string;
  buttonTitle: string;
  borderColor: string;
}

export const VaultCard: FC<VaultCardProps> = ({
  isLoading = false,
  disabled = false,
  icon,
  title,
  subTitle,
  onClick,
  leftDataTitle,
  leftDataValue,
  rightDataTitle,
  rightDataValue,
  buttonTitle,
  borderColor,
}) => (
  <Container borderColor={borderColor} disabled={disabled} onClick={onClick}>
    {isLoading ? (
      <Header>
        <SkeletonBox height={22} width={90} />
        <SkeletonBox height={22} width={90} />
      </Header>
    ) : (
      <Header>
        <TitleContainer>
          <IconContainer height={22} width={22}>
            {icon}
          </IconContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <SubTitle>{subTitle}</SubTitle>
      </Header>
    )}
    <Content>
      <LeftDataContainer>
        <DataTitle>{leftDataTitle}</DataTitle>
        {isLoading ? (
          <SkeletonBox height={25} width={60} />
        ) : (
          <LeftDataValue>{leftDataValue}</LeftDataValue>
        )}
      </LeftDataContainer>
      <RightDataContainer>
        <DataTitle>{rightDataTitle}</DataTitle>
        {isLoading ? (
          <SkeletonBox height={25} width={60} />
        ) : (
          <RightDataValue>{rightDataValue}</RightDataValue>
        )}
      </RightDataContainer>
    </Content>
    <ButtonContainer>
      <ButtonTitle>{buttonTitle}</ButtonTitle>
    </ButtonContainer>
  </Container>
);
