import { Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { assetFormatter } from "../../shared/helpers";
import { getLongVaultContractsTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";

export const PendingDepositInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const {
    collateralSymbol = "",
    id = "",
    type = VaultType.CALL,
    assetSymbol = "",
  } = basicVaultData ?? {};

  const { depositPending = null } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const vaultTitle = getLongVaultContractsTitle(
    type,
    assetSymbol,
    collateralSymbol
  );

  const tokenSymbol =
    id === "TN-CSCCv1-MATICUSD" ? vaultTitle : collateralSymbol;

  const formattedDepositPending = depositPending
    ? `${assetFormatter.format(depositPending.toNumber())} ${tokenSymbol}`
    : "N/A";

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <Tooltip
          content="Deposit Pending indicates a non-active deposit by the user in the vault. This deposit will not earn premium nor be exposed to options risk. Once the current epoch has been concluded, the pending deposit will become an active position by default."
          id="depositPending"
          root={<InfoTitle>Deposit Pending</InfoTitle>}
        />
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : formattedDepositPending}
      </InfoValue>
    </InfoContainer>
  );
};
