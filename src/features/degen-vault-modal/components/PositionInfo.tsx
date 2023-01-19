import Big from "big.js";

import { numberFormatter } from "../../shared/helpers";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import {
  Container as VaultInfoContainer,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import {
  VaultStatusInfo,
  CurrentPositionInfo,
} from "../../basic-vault-modal/components";
import { VaultType } from "../../basic-vault/types";
import { TabType } from "../../basic-vault-modal/types";
import { useVaultModalState } from "../../modal/hooks";

import { PendingPositionInfo } from "./PendingPositionInfo";
import { Container } from "./PositionsInfo.styles";

// eslint-disable-next-line complexity
export const PositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const {
    type = VaultType.CALL,
    collateralSymbol = "",
    percentageYields = { periodPercentageYield: 0 },
  } = basicVaultData ?? {};

  const { periodPercentageYield } = percentageYields;

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const positionValue = currentPosition ?? new Big(0);
  const premiumValue = positionValue.mul(periodPercentageYield).div(100);
  const totalValue = positionValue.add(premiumValue);

  const [formattedSuccessEpochPosition, formattedFailedEpochPosition] = [
    totalValue,
    premiumValue,
  ].map(
    (value) => `${numberFormatter.format(value.toNumber())} ${collateralSymbol}`
  );

  const successEpochTitle =
    type === VaultType.CONDOR
      ? "Max - Spot between short strike range"
      : `Max - Spot ${
          type === VaultType.CALL ? "below" : "above"
        } short strike`;

  const failedEpochTitle =
    type === VaultType.CONDOR
      ? "Min - Spot exceeds long strike range"
      : `Min - Spot ${type === VaultType.CALL ? "above" : "below"} long strike`;

  return (
    <Container>
      <VaultInfoContainer>
        <VaultStatusInfo />
        <PendingPositionInfo />
        <CurrentPositionInfo />
      </VaultInfoContainer>
      {tabType === TabType.withdraw && positionValue.gt(0) ? (
        <VaultInfoContainer>
          <InfoContainer>
            <InfoTitle>New Position</InfoTitle>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>{successEpochTitle}</InfoTitle>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : formattedSuccessEpochPosition}
            </InfoValue>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>{failedEpochTitle}</InfoTitle>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : formattedFailedEpochPosition}
            </InfoValue>
          </InfoContainer>
        </VaultInfoContainer>
      ) : null}
    </Container>
  );
};
