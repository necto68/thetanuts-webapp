import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { currencyFormatter } from "../../shared/helpers";

import { OptionSelect } from "./OptionSelect";
import {
  Container,
  TitleContainer,
  SubTitle,
  PriceTitle,
  CurrentPriceContainer,
} from "./AssetHeader.styles";

export const AssetHeader = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data } = basicVaultQuery;
  const { assetPrice = 0 } = data ?? {};

  const formattedAssetPrice = currencyFormatter.format(assetPrice);

  return (
    <Container>
      <TitleContainer>
        <OptionSelect />
      </TitleContainer>
      <CurrentPriceContainer>
        <SubTitle>Current Price</SubTitle>
        <PriceTitle>{formattedAssetPrice}</PriceTitle>
      </CurrentPriceContainer>
    </Container>
  );
};
