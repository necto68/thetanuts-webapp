import Big from "big.js";

import { numberFormatter } from "../../shared/helpers";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import {
  Container as VaultInfoContainer,
  InfoContainer,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { CurrentPositionInfo } from "../../basic-vault-modal/components";
import { VaultType } from "../../basic-vault/types";

import { PendingPositionInfo } from "./PendingPositionInfo";
import {
  Container,
  SimulatedInfoTitle,
  SimulatedInfoValue,
} from "./PositionsInfo.styles";

// eslint-disable-next-line complexity
export const PositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();
  const { inputValue } = useBasicModalState();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;
  const inputValueBig = new Big(inputValue || 0);

  const {
    type = VaultType.CALL,
    collateralSymbol = "",
    percentageYields = { weeklyPercentageYield: 0 },
  } = basicVaultData ?? {};

  const { weeklyPercentageYield } = percentageYields;

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const isSimulated = inputValueBig.gt(0);
  const positionValue = isSimulated ? inputValueBig : currentPosition;
  const premiumValue = positionValue
    ? positionValue.mul(weeklyPercentageYield).div(100)
    : null;
  const totalValue =
    positionValue && premiumValue ? positionValue.add(premiumValue) : null;

  const [formattedSuccessEpochPosition, formattedFailedEpochPosition] = [
    totalValue,
    premiumValue,
  ].map((value) =>
    value
      ? `${numberFormatter.format(value.toNumber())} ${collateralSymbol}`
      : "N/A"
  );

  const successEpochTitle =
    type === VaultType.CONDOR
      ? "Spot Price between Strike Price Range"
      : `Spot Price ${type === VaultType.CALL ? "<" : ">"} Strike Price`;

  const failedEpochTitle =
    type === VaultType.CONDOR
      ? "Spot Price exceeds Strike Price Range"
      : `Spot Price ${type === VaultType.CALL ? ">" : "<"} Strike Price`;

  return (
    <Container>
      <VaultInfoContainer>
        <CurrentPositionInfo />
        <PendingPositionInfo />
      </VaultInfoContainer>
      <VaultInfoContainer>
        <InfoContainer>
          <SimulatedInfoTitle isSimulated={isSimulated}>
            {isSimulated ? "New Position (Simulated)" : "New Position"}
          </SimulatedInfoTitle>
        </InfoContainer>
        <InfoContainer>
          <SimulatedInfoTitle isSimulated={isSimulated}>
            {successEpochTitle}
          </SimulatedInfoTitle>
          <SimulatedInfoValue isAlignRight isSimulated={isSimulated}>
            {isLoading ? loadingPlaceholder : formattedSuccessEpochPosition}
          </SimulatedInfoValue>
        </InfoContainer>
        <InfoContainer>
          <SimulatedInfoTitle isSimulated={isSimulated}>
            {failedEpochTitle}
          </SimulatedInfoTitle>
          <SimulatedInfoValue isAlignRight isSimulated={isSimulated}>
            {isLoading ? loadingPlaceholder : formattedFailedEpochPosition}
          </SimulatedInfoValue>
        </InfoContainer>
      </VaultInfoContainer>
    </Container>
  );
};
