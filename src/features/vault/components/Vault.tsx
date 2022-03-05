import { type FC, useCallback } from "react";

import { changeColor, numberFormatter } from "../../shared/helpers";
import { vaultTitles, ILModeTitles, VaultType } from "../constants";
import { useVault } from "../hooks";
import { useModalState } from "../../vault-modal/hooks";
import { SkeletonBox } from "../../shared/components";

import { VaultCapacity } from "./VaultCapacity";
import {
  VaultContainer,
  HeaderContainer,
  TypeContainer,
  TypeTitle,
  ILModeContainer,
  ILModeTitle,
  ContentContainer,
  VaultTitle,
  Description,
  APYTitle,
  APYValue,
  FooterContainer,
  PositionTitleContainer,
  PositionTitle,
  PositionAssetContainer,
  PositionAsset,
  Wrapper,
} from "./Vault.styles";

interface VaultProps {
  vaultAddress: string;
}

export const Vault: FC<VaultProps> = ({ vaultAddress }) => {
  const vault = useVault(vaultAddress);
  const [, setModalState] = useModalState();

  const handleVaultClick = useCallback(() => {
    setModalState({ isShow: true, vaultAddress });
  }, [setModalState, vaultAddress]);

  if (!vault) {
    return null;
  }

  const {
    type,
    title,
    description,
    color,
    ILMode,
    apy,
    currentDeposit,
    maxDeposit,
    depositSymbol,
    userPosition,
  } = vault;

  const primaryColor = changeColor(color, 30);
  const vaultTitle = vaultTitles[type];

  return (
    <VaultContainer color={primaryColor} onClick={handleVaultClick}>
      <HeaderContainer>
        <TypeContainer color={color}>
          <TypeTitle>{vaultTitle}</TypeTitle>
        </TypeContainer>
        {type === VaultType.IL ? (
          <ILModeContainer>
            {typeof ILMode === "number" ? (
              <ILModeTitle>{ILModeTitles[ILMode]}</ILModeTitle>
            ) : (
              <SkeletonBox height={21} width={68} />
            )}
          </ILModeContainer>
        ) : null}
      </HeaderContainer>
      <ContentContainer>
        <Wrapper>
          <VaultTitle>{title}</VaultTitle>
          <Description>{description}</Description>
        </Wrapper>
        <Wrapper>
          <APYTitle>
            Current Projected Yield <b>(APY)</b>
          </APYTitle>
          {typeof apy === "number" ? (
            <APYValue color={primaryColor}>
              {`${numberFormatter.format(apy)} %`}
            </APYValue>
          ) : (
            <SkeletonBox height={70} width={200} />
          )}
        </Wrapper>
        <VaultCapacity
          currentDeposit={currentDeposit}
          depositSymbol={depositSymbol}
          maxDeposit={maxDeposit}
          primaryColor={primaryColor}
        />
      </ContentContainer>
      <FooterContainer>
        <PositionTitleContainer>
          <PositionTitle>Your</PositionTitle>
          <PositionTitle>Position</PositionTitle>
        </PositionTitleContainer>
        <PositionAssetContainer>
          {typeof userPosition !== "undefined" ? (
            <PositionAsset color="#ffffff">
              {numberFormatter.format(userPosition.round(2).toNumber())}
            </PositionAsset>
          ) : (
            <SkeletonBox height={42} width={115} />
          )}
          <PositionAsset color={primaryColor}>{depositSymbol}</PositionAsset>
        </PositionAssetContainer>
      </FooterContainer>
    </VaultContainer>
  );
};
