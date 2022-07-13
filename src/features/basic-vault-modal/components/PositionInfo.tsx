import Big from "big.js";

import { InfoIcon, Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { numberFormatter } from "../../shared/helpers";

export const PositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { collateralSymbol = "", annualPercentageYield = 0 } =
    basicVaultData ?? {};

  const {
    currentPosition = new Big(0),
    withdrawalPending = new Big(0),
    premiumRealized = new Big(0),
  } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const [
    formattedCurrentPosition,
    formattedWithdrawalPending,
    formattedPremiumRealized,
  ] = [currentPosition, withdrawalPending, premiumRealized].map((value) =>
    value
      ? `${numberFormatter.format(value.toNumber())} ${collateralSymbol}`
      : "N/A"
  );

  const formattedAPY = `${annualPercentageYield}%`;

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Current Position</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedCurrentPosition}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Withdrawal Pending</InfoTitle>
          <Tooltip
            content="WITHDRAWAL PENDING TOOLTIP"
            id="withdrawalPending"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedWithdrawalPending}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Premium Realized</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedPremiumRealized}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Projected APY%</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedAPY}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Performance/Management Fee</InfoTitle>
        <InfoValue isAlignRight>0.00%</InfoValue>
      </InfoContainer>
    </Container>
  );
};
