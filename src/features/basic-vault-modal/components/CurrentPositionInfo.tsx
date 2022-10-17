import Big from "big.js";

import { InfoIcon, Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { numberFormatter } from "../../shared/helpers";
import { BasicVaultType } from "../../basic/types";

export const CurrentPositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { basicVaultType = BasicVaultType.BASIC, collateralSymbol = "" } =
    basicVaultData ?? {};

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const tooltipContent =
    basicVaultType === BasicVaultType.BASIC
      ? "Refers to the user's current active position in the option vault. If the user has made a deposit during mid-epoch, although it appears in the current position, no premiums would be generated on that deposited amount until the new epoch has started. Premiums generated from previous epochs would be included into the user's current position."
      : "Refers to the user's current active position in the option vault.";

  const loadingPlaceholder = ".....";

  const formattedCurrentPosition = currentPosition
    ? `${numberFormatter.format(
        currentPosition.toNumber()
      )} ${collateralSymbol}`
    : "N/A";

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <InfoTitle>Active Position</InfoTitle>
        <Tooltip
          content={tooltipContent}
          id="currentPosition"
          root={<InfoIcon />}
        />
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : formattedCurrentPosition}
      </InfoValue>
    </InfoContainer>
  );
};
