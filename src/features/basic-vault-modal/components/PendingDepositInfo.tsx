import { InfoIcon, Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { numberFormatter } from "../../shared/helpers";

export const PendingDepositInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { collateralSymbol = "" } = basicVaultData ?? {};

  const { depositPending = null } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const formattedDepositPending = depositPending
    ? `${numberFormatter.format(depositPending.toNumber())} ${collateralSymbol}`
    : "N/A";

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <InfoTitle>Deposit Pending</InfoTitle>
        <Tooltip
          content="Deposit Pending indicates a non-active deposit by the user in the vault. This deposit will not earn premium nor be exposed to options risk. Once the current epoch has been concluded, the pending deposit will become an active position by default."
          id="depositPending"
          root={<InfoIcon />}
        />
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : formattedDepositPending}
      </InfoValue>
    </InfoContainer>
  );
};
