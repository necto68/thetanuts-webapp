import Big from "big.js";

import { Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../hooks";
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
import { useLongModalConfig } from "../../long-vault-modal/hooks";

import { StrikePrices } from "./StrikePrices";

// eslint-disable-next-line complexity
export const VaultInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { longVaultReaderQuery } = useLongModalConfig();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const { data: longVaultReaderData, isLoading: isLongVaultReaderLoading } =
    longVaultReaderQuery;

  const {
    basicVaultType = BasicVaultType.BASIC,
    collateralSymbol = "",
    assetPrice = 0,
    balance: basicVaultBalance = new Big(0),
    collatCap = new Big(0),
    feePerYear = 0,
  } = data ?? {};

  const { balance: longVaultBalance = new Big(0), supplyCap = new Big(0) } =
    longVaultReaderData ?? {};

  const isLoading = isBasicVaultLoading || isLongVaultReaderLoading;

  const isLongVault = basicVaultType === BasicVaultType.LONG;

  const loadingPlaceholder = ".....";

  const balanceValue = isLongVault ? longVaultBalance : basicVaultBalance;

  const capValue = isLongVault ? supplyCap : collatCap;

  const percentageValue = capValue.gt(0)
    ? balanceValue.div(capValue).mul(100).round(1)
    : new Big(0);

  const formattedPercentage = numberFormatter.format(
    percentageValue.toNumber()
  );
  const formattedBalance = numberFormatter.format(balanceValue.toNumber());
  const formattedCap = numberFormatter.format(capValue.toNumber());
  const formattedCapacity = `${formattedPercentage}%`;
  const formattedCapacityTooltip = `(${formattedBalance} / ${formattedCap} ${collateralSymbol})`;

  const formattedAssetPrice = currencyFormatter.format(assetPrice);

  const feeTitle = isLongVault ? "Borrow Fee (APR)" : "Management Fee (APR)";

  const formattedFee = isLongVault ? "2%" : `${feePerYear * 100}%`;

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
      </InfoGroup>
      <InfoGroup>
        <InfoContainer>
          <InfoTitleGray>Underlying Asset</InfoTitleGray>
          <InfoValueGray isAlignRight>
            {isLoading ? loadingPlaceholder : collateralSymbol}
          </InfoValueGray>
        </InfoContainer>
        <InfoContainer>
          <Tooltip
            content={String(formattedCapacityTooltip)}
            id="capacity"
            root={<InfoTitleGray>Capacity</InfoTitleGray>}
          />
          <InfoValueGray isAlignRight>
            {isLoading ? loadingPlaceholder : formattedCapacity}
          </InfoValueGray>
        </InfoContainer>
        <InfoContainer>
          <InfoTitleGray>{feeTitle}</InfoTitleGray>
          <InfoValueGray isAlignRight>
            {isLoading ? loadingPlaceholder : formattedFee}
          </InfoValueGray>
        </InfoContainer>
      </InfoGroup>
    </InfoGroupContainer>
  );
};
