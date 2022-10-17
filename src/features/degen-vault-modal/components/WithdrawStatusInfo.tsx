import { InfoIcon, Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

export const WithdrawStatusInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: basicVaultReaderData, isLoading: isBasicVaultReaderLoading } =
    basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { epoch = 0 } = basicVaultData ?? {};

  const { withdrawalPending = null, queuedExitEpoch = null } =
    basicVaultReaderData ?? {};

  const loadingPlaceholder = ".....";

  let withdrawStatus = "-";

  if (queuedExitEpoch && epoch > queuedExitEpoch) {
    withdrawStatus = "Ready to Claim";
  } else if (withdrawalPending?.gt(0)) {
    withdrawStatus = "Pending";
  } else {
    withdrawStatus = "-";
  }

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <InfoTitle>Withdraw Status</InfoTitle>
        <Tooltip
          content='When a user has initiated a withdrawal during mid-epoch, the withdraw status would indicate "Pending". Once the current epoch has ended and users can claim their withdrawn amount, the withdraw status would indicate "Ready to Claim".'
          id="withdrawStatus"
          root={<InfoIcon />}
        />
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : withdrawStatus}
      </InfoValue>
    </InfoContainer>
  );
};
