import { Tooltip } from "../../shared/components";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

export const WithdrawStatusInfo = () => {
  const { basicVaultReaderQuery } = useBasicModalConfig();

  const { data, isLoading } = basicVaultReaderQuery;

  const { withdrawalPending = null, isReadyToWithdraw = false } = data ?? {};

  const loadingPlaceholder = ".....";

  let withdrawStatus = "-";

  if (isReadyToWithdraw) {
    withdrawStatus = "Ready to Claim";
  } else if (withdrawalPending?.gt(0)) {
    withdrawStatus = "Pending";
  } else {
    withdrawStatus = "-";
  }

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <Tooltip
          content='When a user has initiated a withdrawal during mid-epoch, the withdraw status would indicate "Pending". Once the current epoch has ended and users can claim their withdrawn amount, the withdraw status would indicate "Ready to Claim".'
          id="withdrawStatus"
          root={<InfoTitle>Withdraw Status</InfoTitle>}
        />
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : withdrawStatus}
      </InfoValue>
    </InfoContainer>
  );
};
