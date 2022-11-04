import Big from "big.js";

import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { useBasicVaultEpochTimerTitle } from "../../basic-vault/hooks/useBasicVaultEpochTimerTitle";
import { currencyFormatter, numberFormatter } from "../../shared/helpers";
import {
  InfoContainer,
  InfoGroup,
  InfoGroupContainer,
  InfoTitle,
  InfoTitleGray,
  InfoValue,
  InfoValueGray,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { BasicVaultType } from "../../basic/types";

import { StrikePrices } from "./StrikePrices";
import { BasicVaultType } from "../../basic/types";
import { useLendingMarketModalConfig } from "../../lending-market-vault-modal/hooks";

// eslint-disable-next-line complexity
export const VaultInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { lendingMarketVaultReaderQuery } = useLendingMarketModalConfig();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const {
    data: lendingMarketVaultReaderData,
    isLoading: isLendingMarketVaultReaderLoading,
  } = lendingMarketVaultReaderQuery;

  const {
    basicVaultType = BasicVaultType.BASIC,
    collateralSymbol = "",
    assetPrice = 0,
    balance: basicVaultBalance = new Big(0),
    collatCap = new Big(0),
    expiry = 0,
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  const {
    balance: lendingMarketVaultBalance = new Big(0),
    supplyCap = new Big(0),
  } = lendingMarketVaultReaderData ?? {};

  const isLoading = isBasicVaultLoading || isLendingMarketVaultReaderLoading;

  const isBasicVault = basicVaultType === BasicVaultType.BASIC;

  const timerTitle = useBasicVaultEpochTimerTitle(
    expiry,
    isSettled,
    isExpired,
    isAllowInteractions
  );

  const loadingPlaceholder = ".....";

  const balanceValue =
    basicVaultType === BasicVaultType.LENDING_MARKET
      ? lendingMarketVaultBalance
      : basicVaultBalance;

  const capValue =
    basicVaultType === BasicVaultType.LENDING_MARKET ? supplyCap : collatCap;

  const formattedBalance = numberFormatter.format(balanceValue.toNumber());
  const formattedCap = numberFormatter.format(capValue.toNumber());
  const formattedCapacity = `${formattedBalance} / ${formattedCap} ${collateralSymbol}`;

  const formattedAssetPrice = currencyFormatter.format(assetPrice);

  return (
    <InfoGroupContainer>
      <InfoGroup>
        <InfoContainer>
          <InfoTitle>Spot Price</InfoTitle>
          <InfoValue isAlignRight>
            {isLoading ? loadingPlaceholder : formattedAssetPrice}
          </InfoValue>
        </InfoContainer>
        <StrikePrices loadingPlaceholder={loadingPlaceholder} />
        {isBasicVault ? (
          <InfoContainer>
            <InfoTitle>Epoch Starts/Ends In</InfoTitle>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : timerTitle}
            </InfoValue>
          </InfoContainer>
        ) : null}
      </InfoGroup>
      <InfoGroup>
        <InfoContainer>
          <InfoTitleGray>Underlying Asset</InfoTitleGray>
          <InfoValueGray isAlignRight>
            {isLoading ? loadingPlaceholder : collateralSymbol}
          </InfoValueGray>
        </InfoContainer>
        <InfoContainer>
          <InfoTitleGray>Capacity</InfoTitleGray>
          <InfoValueGray isAlignRight>
            {isLoading ? loadingPlaceholder : formattedCapacity}
          </InfoValueGray>
        </InfoContainer>
        <InfoContainer>
          <InfoTitleGray>Performance/Management Fee</InfoTitleGray>
          <InfoValueGray isAlignRight>0.00%</InfoValueGray>
        </InfoContainer>
      </InfoGroup>
    </InfoGroupContainer>
  );
};
