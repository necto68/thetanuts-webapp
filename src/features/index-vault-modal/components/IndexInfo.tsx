import { useIndexVaultModalState } from "../hooks";
import { useIndexVault } from "../../index-vault/hooks";
import { currencyFormatterWithoutDecimals } from "../../shared/helpers";

import { Container, InfoContainer, InfoValue } from "./IndexInfo.styles";

export const IndexInfo = () => {
  const [{ tokenSymbol }] = useIndexVaultModalState();
  const { isIndexVaultLoading, data } = useIndexVault(tokenSymbol);

  const formattedTVL = !isIndexVaultLoading
    ? currencyFormatterWithoutDecimals.format(data.totalValueLocked)
    : ".....";

  const assetSymbol = data.assetSymbol || ".....";

  return (
    <Container>
      <InfoContainer>
        <InfoValue>Index Value</InfoValue>
        <InfoValue>1.12345 ETH</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>TVL</InfoValue>
        <InfoValue>{formattedTVL}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Underlying Asset</InfoValue>
        <InfoValue>{assetSymbol}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoValue>Index Token Address</InfoValue>
        <InfoValue>tETH (4j234t...Ti32)</InfoValue>
      </InfoContainer>
    </Container>
  );
};
