import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { BaseButton, SkeletonBox } from '../../shared/components';
import { VaultCapacity } from '../../vault/components';
import { EpochExpiration } from './EpochExpiration';
import { Deposit } from './Deposit';
import { vaultTitles } from '../../vault/constants';
import { useModalState, useModalVault } from '../hooks';
import { currencyFormatter, numberFormatter } from '../../shared/helpers';

export const VaultModal = () => {
  const [, setModalState] = useModalState();
  const vault = useModalVault();

  const handleCloseButtonClick = useCallback(() => {
    setModalState((prevState) => ({ ...prevState, isShow: false }));
  }, [setModalState]);

  useEffect(() => {
    if (!vault) {
      handleCloseButtonClick();
    }
  }, [vault, handleCloseButtonClick]);

  if (!vault) {
    return null;
  }

  const {
    type,
    title,
    color,
    apy,
    expiry,
    isEpochSettled,
    isEpochExpired,
    currentDeposit,
    maxDeposit,
    assetSymbol,
    depositSymbol,
    assetPrice,
    strikePrice,
  } = vault;

  const vaultTitle = vaultTitles[type];

  return (
    <VaultModalContainer color={color}>
      <HeaderContainer color={color}>
        <div />
        <TypeTitle>{vaultTitle}</TypeTitle>
        <CloseButton onClick={handleCloseButtonClick}>✕</CloseButton>
      </HeaderContainer>
      <ContentContainer>
        <MainContentContainer>
          <InfoContainer>
            <InfoItem>
              <AssetTitle>{title}</AssetTitle>
              <DataContainer>
                <PriceTitle>{`Current ${
                  assetSymbol ?? 'Asset'
                } Price`}</PriceTitle>
                {typeof assetPrice === 'number' ? (
                  <PriceValue>
                    {currencyFormatter.format(assetPrice)}
                  </PriceValue>
                ) : (
                  <SkeletonBox width={70} height={39} />
                )}
              </DataContainer>
            </InfoItem>
            <InfoItem>
              <VaultCapacity
                primaryColor={color}
                currentDeposit={currentDeposit}
                maxDeposit={maxDeposit}
                depositSymbol={depositSymbol}
              />
            </InfoItem>
            <InfoItem>
              <VaultDataContainer>
                <DataContainer>
                  <DataTitle>Strike Price</DataTitle>
                  {typeof strikePrice !== 'undefined' ? (
                    <DataValue>
                      {strikePrice
                        ? currencyFormatter.format(strikePrice)
                        : 'Awaiting settlement'}
                    </DataValue>
                  ) : (
                    <SkeletonBox width={70} height={27} />
                  )}
                </DataContainer>
                <DataContainer>
                  <DataTitle>Current Projected Yield (APY)</DataTitle>
                  {typeof apy === 'number' ? (
                    <APYValue>{`${numberFormatter.format(apy)}%`}</APYValue>
                  ) : (
                    <SkeletonBox width={70} height={27} />
                  )}
                </DataContainer>
                <EpochExpiration
                  expiry={expiry}
                  isEpochSettled={isEpochSettled}
                  isEpochExpired={isEpochExpired}
                />
              </VaultDataContainer>
            </InfoItem>
            <DescriptionTitle>VAULT STRATEGY</DescriptionTitle>
            <Description>
              The vault earns yield on its ETH deposits by running a weekly
              automated ETH covered call strategy. The vault reinvests the yield
              earned back into the strategy, effectively compounding the yields
              for depositors over time.
            </Description>
            <DescriptionTitle>WITHDRAWALS</DescriptionTitle>
            <Description>
              The vault allocates 90% of the funds deposited towards its
              strategy and reserves 10% of the funds deposited for withdrawals.
              If in any given week the 10% withdrawal limit is reached,
              withdrawals from the vault will be disabled and depositors will
              have to wait until the following week in order to withdraw their
              funds.
            </Description>
            <Description>
              Withdrawing from the vault has a fixed withdrawal fee of 0.5%.
              This is to encourage longer-term depositors.
            </Description>
            <DescriptionTitle>RISK</DescriptionTitle>
            <Description>
              The primary risk for running this covered call strategy is that
              the vault may incur a weekly loss in the case where the call
              options sold by the vault expire in-the-money (meaning the price
              of ETH is above the strike price of the call options minted by the
              vault).
            </Description>
          </InfoContainer>
          <DepositContainer>
            <Deposit />
          </DepositContainer>
        </MainContentContainer>
      </ContentContainer>
    </VaultModalContainer>
  );
};

interface Colored {
  color: string;
}

const VaultModalContainer = styled.div<Colored>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
  max-height: 100vh;
  border-radius: 10px;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ color }) => color};
  box-shadow: 0 0 20px ${({ color }) => color};
`;

const HeaderContainer = styled.div<Colored>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ color }) => color};
  padding: 7px;
`;

const TypeTitle = styled.h2`
  font-family: Barlow;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
`;

const CloseButton = styled(BaseButton)`
  border-radius: 50%;
  padding: 5px 12px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px;
  background-color: #252629;
  overflow: auto;
`;

const MainContentContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #5d5d5d;
  padding: 25px 0;

  &:first-child {
    padding: 0 0 25px;
  }
`;

const AssetTitle = styled.span`
  font-family: Roboto;
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #cfcfcf;
`;

const DataValue = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  text-transform: uppercase;
`;

const VaultDataContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  ${DataContainer} {
    flex: 1;
  }
`;

const PriceTitle = styled(DataTitle)`
  font-size: 14px;
`;

const PriceValue = styled(DataValue)`
  font-size: 26px;
`;

const APYValue = styled(DataValue)`
  color: #03f43e;
`;

const DescriptionTitle = styled.p`
  font-family: Roboto;
  font-weight: 700;
  font-size: 15px;
  color: #ffffff;
  margin: 20px 0 0 0;
`;

const Description = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 9px;
  color: #c4c4c4;
`;

const DepositContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
