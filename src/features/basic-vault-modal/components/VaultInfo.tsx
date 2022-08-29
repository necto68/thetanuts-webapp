import Big from "big.js";

import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { useBasicVaultEpochTimerTitle } from "../../basic-vault/hooks/useBasicVaultEpochTimerTitle";
import {
  currencyFormatter,
  numberFormatter,
  strikePriceFormatter,
} from "../../shared/helpers";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

export const VaultInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data, isLoading } = basicVaultQuery;
  const {
    collateralSymbol = "",
    assetPrice = 0,
    balance = new Big(0),
    collatCap = new Big(0),
    strikePrice = 0,
    expiry = 0,
    isExpired = false,
    isSettled = false,
  } = data ?? {};

  const timerTitle = useBasicVaultEpochTimerTitle(expiry, isExpired, isSettled);

  const loadingPlaceholder = ".....";

  const formattedBalance = numberFormatter.format(balance.toNumber());
  const formattedCollatCap = numberFormatter.format(collatCap.toNumber());
  const formattedCapacity = `${formattedBalance} / ${formattedCollatCap} ${collateralSymbol}`;

  const formattedAssetPrice = currencyFormatter.format(assetPrice);
  const formattedStrikePrice = strikePrice
    ? strikePriceFormatter(strikePrice)
    : "Auction In Progress";

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Underlying Asset</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : collateralSymbol}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Capacity</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedCapacity}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Current Spot Price</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedAssetPrice}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Strike Price</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedStrikePrice}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Epoch Starts/Ends In</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : timerTitle}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
