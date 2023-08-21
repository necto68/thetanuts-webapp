import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { expiryFormatter } from "../../shared/helpers";

import {
  Container,
  Title,
  InputContainer,
  InputValue,
} from "./CollateralInput.styles";

export const ExpiryInput = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { data, isLoading } = basicVaultQuery;

  const { expiry = 0 } = data ?? {};

  const formattedExpiry = expiry === 0 ? "N/A" : expiryFormatter(expiry);

  const loadingPlaceholder = ".....";

  return (
    <Container>
      <Title>Expiry</Title>
      <InputContainer>
        <InputValue>
          {isLoading ? loadingPlaceholder : formattedExpiry}
        </InputValue>
      </InputContainer>
    </Container>
  );
};
