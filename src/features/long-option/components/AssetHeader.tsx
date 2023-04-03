import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { getLogoBySymbol } from "../../logo/helpers";
import { currencyFormatter } from "../../shared/helpers";
import { IconContainer } from "../../shared/components";

import {
  Container,
  TitleContainer,
  Title,
  SubTitle,
  PriceTitle,
  CurrentPriceContainer,
} from "./AssetHeader.styles";

export const AssetHeader = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data, isLoading } = basicVaultQuery;
  const { assetSymbol = "", assetPrice = 0 } = data ?? {};

  const assetLogo = getLogoBySymbol(assetSymbol);
  const formattedAssetPrice = currencyFormatter.format(assetPrice);

  return (
    <Container>
      <TitleContainer>
        <IconContainer height={25} width={25}>
          {assetLogo}
        </IconContainer>
        <Title>{isLoading ? "-" : `${assetSymbol} Long`}</Title>
      </TitleContainer>
      <CurrentPriceContainer>
        <SubTitle>Current Price</SubTitle>
        <PriceTitle>{formattedAssetPrice}</PriceTitle>
      </CurrentPriceContainer>
    </Container>
  );
};
