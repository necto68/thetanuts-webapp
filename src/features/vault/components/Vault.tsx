import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { changeColor } from '../../shared/helpers';
import { vaultTitles, ILModeTitles, VaultTypes } from '../constants';
import { useVault } from '../hooks';
import { useModalState } from '../../vault-modal/hooks';
import { numberFormatter } from '../../shared/helpers';
import { SkeletonBox } from '../../shared/components';
import { VaultCapacity } from './VaultCapacity';

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
        {type === VaultTypes.IL ? (
          <ILModeContainer>
            {typeof ILMode === 'number' ? (
              <ILModeTitle>{ILModeTitles[ILMode]}</ILModeTitle>
            ) : (
              <SkeletonBox width={68} height={21} />
            )}
          </ILModeContainer>
        ) : null}
      </HeaderContainer>
      <ContentContainer>
        <div>
          <VaultTitle>{title}</VaultTitle>
          <Description>{description}</Description>
        </div>
        <div>
          <APYTitle>
            Current Projected Yield <b>(APY)</b>
          </APYTitle>
          {typeof apy === 'number' ? (
            <APYValue color={primaryColor}>
              {`${numberFormatter.format(apy)} %`}
            </APYValue>
          ) : (
            <SkeletonBox width={200} height={70} />
          )}
        </div>
        <VaultCapacity
          primaryColor={primaryColor}
          currentDeposit={currentDeposit}
          maxDeposit={maxDeposit}
          depositSymbol={depositSymbol}
        />
      </ContentContainer>
      <FooterContainer>
        <PositionTitleContainer>
          <PositionTitle>Your</PositionTitle>
          <PositionTitle>Position</PositionTitle>
        </PositionTitleContainer>
        <PositionAssetContainer>
          {typeof userPosition !== 'undefined' ? (
            <PositionAsset color={'#ffffff'}>
              {numberFormatter.format(userPosition.round(2).toNumber())}
            </PositionAsset>
          ) : (
            <SkeletonBox width={115} height={42} />
          )}
          <PositionAsset color={primaryColor}>{depositSymbol}</PositionAsset>
        </PositionAssetContainer>
      </FooterContainer>
    </VaultContainer>
  );
};

interface Colored {
  color: string;
}

const VaultContainer = styled(motion.div).attrs<Colored>(({ color }) => ({
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  whileHover: { y: -10, boxShadow: `0 0 20px ${color}` },
  whileTap: {
    scale: 0.97,
    boxShadow: `0 0 10px ${color}`,
    opacity: 0.8,
  },
}))<Colored>`
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 10px;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ color }) => color};
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const TypeContainer = styled.div<Colored>`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: ${({ color }) => color};
  padding: 15px 25px;
`;

const TypeTitle = styled.h3`
  font-family: Barlow;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
`;

const ILModeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #233446;
  box-shadow: inset 2px 0px 4px rgba(0, 0, 0, 0.5);
`;

const ILModeTitle = styled.div`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 25px;
  padding: 20px 25px;
  background-color: #16192e;
`;

const VaultTitle = styled.h1`
  font-family: Roboto;
  font-weight: 700;
  font-size: 28px;
  color: #ffffff;
  margin: 0;
`;

const Description = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 13px;
  color: #ffffff;
`;

const APYTitle = styled.div`
  font-family: Barlow;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
`;

const APYValue = styled.span<Colored>`
  font-family: Barlow;
  font-weight: 700;
  font-size: 52px;
  color: ${({ color }) => color};
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  background-color: #233447;
`;

const PositionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PositionTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
`;

const PositionAssetContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PositionAsset = styled.span<Colored>`
  font-family: Barlow;
  font-weight: 600;
  font-size: 28px;
  color: ${({ color }) => color};
`;
