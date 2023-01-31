import { useState, useCallback } from "react";
import Big from "big.js";

import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { CurrentPositionInfo } from "../../basic-vault-modal/components";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultStatus } from "../../basic-vault-modal/types";
import { Tooltip } from "../../shared/components";
import { assetFormatter } from "../../shared/helpers";
import { VaultType } from "../../basic-vault/types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";
import { ReturnOverviewTabType } from "../types";

import { ReturnOverviewSwitcher } from "./ReturnOverviewSwitcher";
import {
  Container,
  Title,
  Content,
  VaultInfoContainer,
  APYValue,
} from "./ReturnOverview.styles";

// eslint-disable-next-line complexity
export const ReturnOverview = () => {
  const [currentTabType, setCurrentTabType] = useState(
    ReturnOverviewTabType.successEpoch
  );

  const handleTabButtonClick = useCallback((tabType: ReturnOverviewTabType) => {
    setCurrentTabType(tabType);
  }, []);

  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const {
    type = VaultType.CALL,
    collateralSymbol = "",
    assetSymbol = "",
    percentageYields = { periodPercentageYield: 0, annualPercentageYield: 0 },
    strikePrices = [0],
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = basicVaultData ?? {};

  const { periodPercentageYield, annualPercentageYield } = percentageYields;
  const [strikePrice] = strikePrices;

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);
  const vaultStatusesWithHiddenYield = [
    VaultStatus.SETTLED,
    VaultStatus.AUCTION,
  ];

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const premiumValue = vaultStatusesWithHiddenYield.includes(vaultStatus)
    ? new Big(0)
    : currentPosition?.mul(periodPercentageYield).div(100);

  const totalValue =
    currentPosition && premiumValue ? currentPosition.add(premiumValue) : null;

  const formattedAPY = `${annualPercentageYield}%`;

  const [formattedEpochYield, formattedSuccessEpochValue] = [
    premiumValue,
    totalValue,
  ].map((value) =>
    value
      ? `${assetFormatter.format(value.toNumber())} ${collateralSymbol}`
      : "N/A"
  );

  const failedEpochValue =
    type === VaultType.CALL
      ? totalValue?.mul(strikePrice)
      : totalValue?.div(strikePrice);

  const failedEpochSymbol = type === VaultType.CALL ? "USDC" : assetSymbol;

  const formattedFailedEpochValue = failedEpochValue
    ? `${assetFormatter.format(
        failedEpochValue.toNumber()
      )} ${failedEpochSymbol}`
    : "N/A";

  const formattedReceiveValue =
    currentTabType === ReturnOverviewTabType.successEpoch
      ? formattedSuccessEpochValue
      : formattedFailedEpochValue;

  return (
    <Container isOpen>
      <Title>Return Overview</Title>
      <Content>
        <ReturnOverviewSwitcher
          currentTabType={currentTabType}
          onTabButtonClick={handleTabButtonClick}
        />
        <VaultInfoContainer>
          <CurrentPositionInfo />
          <InfoContainer>
            <InfoTitleContainer>
              <Tooltip
                content="Yield refers to the premiums generated based on the user's position for the epoch in-progress. Deposits made during mid-epoch do not generate yield."
                id="yield"
                root={
                  <InfoTitle>
                    Yield (<APYValue>{formattedAPY}</APYValue> APY)
                  </InfoTitle>
                }
              />
            </InfoTitleContainer>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : formattedEpochYield}
            </InfoValue>
          </InfoContainer>
          <InfoContainer>
            <InfoTitleContainer>
              <Tooltip
                content='This shows 2 outcomes in case the call/put option expires ITM or OTM. If the option expired OTM, the user will receive the sum of the active position and the yield generated. If the option expired ITM, the user will receive "(Active position / Strike price ) + (Yield / Settlement Price)".'
                id="youWillReceive"
                root={<InfoTitle>You will Receive</InfoTitle>}
              />
            </InfoTitleContainer>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : formattedReceiveValue}
            </InfoValue>
          </InfoContainer>
        </VaultInfoContainer>
      </Content>
    </Container>
  );
};
