import Big from "big.js";

import { Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { assetFormatter } from "../../shared/helpers";
import { BasicVaultType } from "../../basic/types";

export const BoostUtilization = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { basicVaultType = BasicVaultType.BASIC, collateralSymbol = "" } =
    basicVaultData ?? {};

  const { currentPosition = new Big(0) } = basicVaultReaderData ?? {};

  const tooltipContents = {
    [BasicVaultType.BASIC]:
      "Refers to the user's current active position in the option vault. If the user has made a deposit during mid-epoch, although it appears in the current position, no premiums would be generated on that deposited amount until the new epoch has started. Premiums generated from previous epochs would be included into the user's current position.",

    [BasicVaultType.DEGEN]:
      "Refers to the user's current active position in the option vault.",

    [BasicVaultType.WHEEL]:
      "Refers to the user's current active position which consists of the user's position in the epoch and deposits made during mid-epoch. If the option contract expired ITM, the user's active position will be converted into the corresponding asset.",

    [BasicVaultType.LONG]:
      "Refers to the user's current active position in the option vault.",
  };

  const tooltipContent = tooltipContents[basicVaultType];

  const loadingPlaceholder = ".....";

  const formattedCurrentPosition = currentPosition
    ? `${assetFormatter.format(currentPosition.toNumber())} ${collateralSymbol}`
    : "N/A";

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <Tooltip
          content={tooltipContent}
          id="currentPosition"
          root={<InfoTitle>Utlization</InfoTitle>}
        />
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : formattedCurrentPosition}
      </InfoValue>
    </InfoContainer>
  );
};
