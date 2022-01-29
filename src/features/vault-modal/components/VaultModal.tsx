import { useCallback, useEffect } from "react";

import { SkeletonBox } from "../../shared/components";
import { VaultCapacity } from "../../vault/components";
import { vaultTitles } from "../../vault/constants";
import { useModalState, useModalVault } from "../hooks";
import { currencyFormatter, numberFormatter } from "../../shared/helpers";

import { Deposit } from "./Deposit";
import { EpochExpiration } from "./EpochExpiration";
import {
  VaultModalContainer,
  HeaderContainer,
  TypeTitle,
  CloseButton,
  ContentContainer,
  MainContentContainer,
  InfoContainer,
  InfoItem,
  AssetTitle,
  DataContainer,
  PriceTitle,
  PriceValue,
  VaultDataContainer,
  DataTitle,
  DataValue,
  APYValue,
  DescriptionTitle,
  Description,
  DepositContainer,
} from "./VaultModal.styles";

export const VaultModal = () => {
  const [, setModalState] = useModalState();
  const vault = useModalVault();

  const handleCloseButtonClick = useCallback(() => {
    setModalState((previousState) => ({ ...previousState, isShow: false }));
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
                  assetSymbol ?? "Asset"
                } Price`}</PriceTitle>
                {typeof assetPrice === "number" ? (
                  <PriceValue>
                    {currencyFormatter.format(assetPrice)}
                  </PriceValue>
                ) : (
                  <SkeletonBox height={39} width={70} />
                )}
              </DataContainer>
            </InfoItem>
            <InfoItem>
              <VaultCapacity
                currentDeposit={currentDeposit}
                depositSymbol={depositSymbol}
                maxDeposit={maxDeposit}
                primaryColor={color}
              />
            </InfoItem>
            <InfoItem>
              <VaultDataContainer>
                <DataContainer>
                  <DataTitle>Strike Price</DataTitle>
                  {typeof strikePrice !== "undefined" ? (
                    <DataValue>
                      {strikePrice
                        ? currencyFormatter.format(strikePrice)
                        : "Awaiting settlement"}
                    </DataValue>
                  ) : (
                    <SkeletonBox height={27} width={70} />
                  )}
                </DataContainer>
                <DataContainer>
                  <DataTitle>Current Projected Yield (APY)</DataTitle>
                  {typeof apy === "number" ? (
                    <APYValue>{`${numberFormatter.format(apy)}%`}</APYValue>
                  ) : (
                    <SkeletonBox height={27} width={70} />
                  )}
                </DataContainer>
                <EpochExpiration
                  expiry={expiry}
                  isEpochExpired={isEpochExpired}
                  isEpochSettled={isEpochSettled}
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
