import { useBasicModalConfig } from "../../basic-vault-modal/hooks";

import {
  Container,
  Title,
  SubTitle,
  PriceTitle,
  CurrentPriceContainer,
} from "./AssetHeader.styles";

export const AssetHeader = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data } = basicVaultQuery;
  const { id = "" } = data ?? {};

  return (
    <Container>
      <Title>Matic Long {id}</Title>
      <CurrentPriceContainer>
        <SubTitle>Current Price</SubTitle>
        <PriceTitle>$XX.XX</PriceTitle>
      </CurrentPriceContainer>
    </Container>
  );
};
