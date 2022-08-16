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
import { useBasicModalState } from "../hooks";
import { TabType } from "../types";

export const PositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();
  const { tabType } = useBasicModalState();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { collateralSymbol = "", annualPercentageYield = 0 } =
    basicVaultData ?? {};

  const { currentPosition = new Big(0), withdrawalPending = new Big(0) } =
    basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const [formattedCurrentPosition, formattedWithdrawalPending] = [
    currentPosition,
    withdrawalPending,
  ].map((value) =>
    value
      ? `${numberFormatter.format(value.toNumber())} ${collateralSymbol}`
      : "N/A"
  );

  const formattedAPY = `${annualPercentageYield}%`;

  return (
    <Container>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Current Position</InfoTitle>
          <Tooltip
            content="Refers the user's current position in the option vault. If the user has made a deposit during mid-epoch, although it appears in the current position, no premiums would be generated on that deposited amount until the new epoch has started. Premiums generated from previous epochs would be included into the user's current position."
            id="currentPosition"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedCurrentPosition}
        </InfoValue>
      </InfoContainer>
      {tabType === TabType.withdraw ? (
        <InfoContainer>
          <InfoTitleContainer>
            <InfoTitle>Withdrawal Pending</InfoTitle>
            <Tooltip
              content="Refers to the amount that is pending to be withdrawn once the current epoch has ended. Once the current epoch has ended, users can claim their withdrawn amount."
              id="withdrawalPending"
              root={<InfoIcon />}
            />
          </InfoTitleContainer>
          <InfoValue isAlignRight>
            {isLoading ? loadingPlaceholder : formattedWithdrawalPending}
          </InfoValue>
        </InfoContainer>
      ) : null}
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
