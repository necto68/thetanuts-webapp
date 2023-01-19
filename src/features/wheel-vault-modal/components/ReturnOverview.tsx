import { useState, useCallback } from "react";
import Big from "big.js";

import { Expander } from "../../index-vault-modal/components/Expander";
import { SectionType } from "../../index-vault-modal/types";
import {
  Container as VaultInfoContainer,
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { CurrentPositionInfo } from "../../basic-vault-modal/components";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { numberFormatter } from "../../shared/helpers";
import { VaultType } from "../../basic-vault/types";
import { Tooltip } from "../../shared/components";
import { ReturnOverviewTabType } from "../types";

import { ReturnOverviewSwitcher } from "./ReturnOverviewSwitcher";
import { Content, APYValue } from "./ReturnOverview.styles";

// eslint-disable-next-line complexity
export const ReturnOverview = () => {
  const [isOpen, setIsOpen] = useState(false);

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
  } = basicVaultData ?? {};

  const { periodPercentageYield, annualPercentageYield } = percentageYields;
  const [strikePrice] = strikePrices;

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const premiumValue = currentPosition?.mul(periodPercentageYield).div(100);
  const totalValue =
    currentPosition && premiumValue ? currentPosition.add(premiumValue) : null;

  const formattedAPY = `${annualPercentageYield}%`;

  const [formattedEpochYield, formattedSuccessEpochValue] = [
    premiumValue,
    totalValue,
  ].map((value) =>
    value
      ? `${numberFormatter.format(value.toNumber())} ${collateralSymbol}`
      : "N/A"
  );

  const failedEpochValue =
    type === VaultType.CALL
      ? totalValue?.mul(strikePrice)
      : totalValue?.div(strikePrice);

  const failedEpochSymbol = type === VaultType.CALL ? "USDC" : assetSymbol;

  const formattedFailedEpochValue = failedEpochValue
    ? `${numberFormatter.format(
        failedEpochValue.toNumber()
      )} ${failedEpochSymbol}`
    : "N/A";

  const formattedReceiveValue =
    currentTabType === ReturnOverviewTabType.successEpoch
      ? formattedSuccessEpochValue
      : formattedFailedEpochValue;

  return (
    <Expander
      isOpen={isOpen}
      onArrowClick={() => {
        setIsOpen(!isOpen);
      }}
      title="Return Overview"
      type={SectionType.returnOverview}
    >
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
                content="YIELD_TOOLTIP"
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
                content="YOU_WILL_RECEIVE_TOOLTIP"
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
    </Expander>
  );
};
