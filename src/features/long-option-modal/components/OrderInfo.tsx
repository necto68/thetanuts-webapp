import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultType } from "../../basic-vault/types";
import { getVaultTypeStrategy } from "../../index-vault/helpers";

import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "./OrderInfo.styles";

export const OrderInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data, isLoading } = basicVaultQuery;
  const { type = VaultType.CALL, assetSymbol = "" } = data ?? {};

  const strategy = getVaultTypeStrategy(type);

  const loadingPlaceholder = ".....";

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Type</InfoTitle>
        <InfoValue>
          {isLoading ? loadingPlaceholder : `Long ${strategy}`}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Pool</InfoTitle>
        <InfoValue>
          {isLoading
            ? loadingPlaceholder
            : `10 Delta ${assetSymbol} Long ${strategy}`}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Leverage</InfoTitle>
        <InfoValue>10x</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Profit Zone</InfoTitle>
        <InfoValue>{"<$XX.XX"}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Max Loss Zone</InfoTitle>
        <InfoValue>{">$XX.XX"}</InfoValue>
      </InfoContainer>
    </Container>
  );
};
