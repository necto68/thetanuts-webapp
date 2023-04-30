import Big from "big.js";

import { Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

export const PendingWithdrawInfo = () => {
  const { basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultReaderLoading;

  const withdrawalPending =
    basicVaultReaderData?.withdrawalPending ?? new Big(0);
  const isReadyToWithdraw = basicVaultReaderData?.isReadyToWithdraw ?? false;

  const loadingPlaceholder = ".....";

  const formattedWithdrawalPending =
    // eslint-disable-next-line no-nested-ternary
    withdrawalPending.toNumber() > 0
      ? isReadyToWithdraw
        ? "Ready to Claim"
        : "Pending"
      : "-";

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
        {isLoading ? loadingPlaceholder : formattedWithdrawalPending}
      </InfoValue>
    </InfoContainer>
  );
};
