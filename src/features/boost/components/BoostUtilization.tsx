import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

export const BoostUtilization = () => {
  const { lendingPoolReaderQuery } = useBasicModalConfig();

  const { data: lendingPoolReaderData, isLoading: isBasicVaultLoading } =
    lendingPoolReaderQuery;

  const isLoading = isBasicVaultLoading;

  const loadingPlaceholder = ".....";

  const { currentVariableBorrowRate = 0 } = lendingPoolReaderData ?? {};
  const formattedUtilization = (
    Number(currentVariableBorrowRate) * 100
  ).toFixed(2);

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <InfoTitle>Utlization</InfoTitle>
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : formattedUtilization}
      </InfoValue>
    </InfoContainer>
  );
};
