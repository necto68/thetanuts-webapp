import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../long-option-modal/components/OrderInfo.styles";
import { expiryFormatter } from "../../shared/helpers";

export const ExpiryInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { data, isLoading } = basicVaultQuery;

  const { expiry = 0 } = data ?? {};

  const formattedExpiry = expiry === 0 ? "N/A" : expiryFormatter(expiry);

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      <InfoTitle>Expiry</InfoTitle>
      <InfoValue>{isLoading ? loadingPlaceholder : formattedExpiry}</InfoValue>
    </InfoContainer>
  );
};
