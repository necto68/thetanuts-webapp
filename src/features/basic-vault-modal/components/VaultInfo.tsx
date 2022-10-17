import Big from "big.js";

import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import { useBasicVaultEpochTimerTitle } from "../../basic-vault/hooks/useBasicVaultEpochTimerTitle";
import { currencyFormatter, numberFormatter } from "../../shared/helpers";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { getFormattedStrikePrices } from "../helpers";
import { VaultType } from "../../basic-vault/types";

export const VaultInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data, isLoading } = basicVaultQuery;
  const {
    type = VaultType.CALL,
    collateralSymbol = "",
    assetPrice = 0,
    balance = new Big(0),
    collatCap = new Big(0),
    strikePrices = [0],
    expiry = 0,
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

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
  const formattedStrikePrices = getFormattedStrikePrices(
    type,
    strikePrices,
    isSettled,
    isExpired,
    isAllowInteractions
  );

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
        <InfoTitle>Spot Price</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedAssetPrice}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Strike Price</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedStrikePrices}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Epoch Starts/Ends In</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : timerTitle}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Performance/Management Fee</InfoTitle>
        <InfoValue isAlignRight>0.00%</InfoValue>
      </InfoContainer>
    </Container>
  );
};
