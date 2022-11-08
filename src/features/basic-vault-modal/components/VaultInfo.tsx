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

export const VaultInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data, isLoading } = basicVaultQuery;
  const {
    basicVaultType = BasicVaultType.BASIC,
    collateralSymbol = "",
    assetPrice = 0,
    balance = new Big(0),
    collatCap = new Big(0),
    expiry = 0,
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  const isBasicVault = basicVaultType === BasicVaultType.BASIC;

  const timerTitle = useBasicVaultEpochTimerTitle(
    expiry,
    isSettled,
    isExpired,
    isAllowInteractions
  );

  const loadingPlaceholder = ".....";

  const formattedBalance = numberFormatter.format(balance.toNumber());
  const formattedCollatCap = numberFormatter.format(collatCap.toNumber());
  const formattedCapacity = `${formattedBalance} / ${formattedCollatCap} ${collateralSymbol}`;

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
