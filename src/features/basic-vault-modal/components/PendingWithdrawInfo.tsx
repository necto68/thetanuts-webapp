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

export const PendingWithdrawInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { collateralSymbol = "" } = basicVaultData ?? {};

  const { withdrawalPending = new Big(0) } = basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  const formattedWithdrawalPending = withdrawalPending
    ? `${numberFormatter.format(
        withdrawalPending.toNumber()
      )} ${collateralSymbol}`
    : "N/A";

  return (
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
  );
};
