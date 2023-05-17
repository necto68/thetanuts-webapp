import Big from "big.js";

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
import { lendingPoolTokenAddresses } from "../../boost/constants";

export const PendingWithdrawInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const {
    collateralSymbol = "",
    id = "",
    assetSymbol = "",
    type = VaultType.CALL,
  } = basicVaultData ?? {};

  const withdrawalPending =
    basicVaultReaderData?.withdrawalPending ?? new Big(0);

  const loadingPlaceholder = ".....";

  const vaultTitle = getLongVaultContractsTitle(
    type,
    assetSymbol,
    collateralSymbol
  );

  const tokenExists = lendingPoolTokenAddresses.some(
    (token) => token.id === id
  );

  const tokenSymbol = tokenExists ? vaultTitle : collateralSymbol;

  const formattedCurrentPosition =
    withdrawalPending.toNumber() > 0
      ? `${assetFormatter.format(withdrawalPending.toNumber())} ${tokenSymbol}`
      : "N/A";

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <Tooltip
          content="Refers to the amount that is pending to be withdrawn once the current epoch has ended. Once the current epoch has ended, users can claim their withdrawn amount."
          id="withdrawalPending"
          root={<InfoTitle>Withdrawal Status</InfoTitle>}
        />
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : formattedCurrentPosition}
      </InfoValue>
    </InfoContainer>
  );
};
