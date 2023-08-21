import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { currencyFormatter, numberFormatter } from "../../shared/helpers";
import { useLongOptionModalConfig } from "../../long-option-modal/hooks";

import { OptionSelect } from "./OptionSelect";
import {
  Container,
  TitleContainer,
  PricesContainer,
  SubTitle,
  PriceTitle,
  PriceContainer,
  PriceChangeTitle,
} from "./AssetHeader.styles";

export const AssetHeader = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { assetPricesQuery } = useLongOptionModalConfig();

  const { data: basicVaultData } = basicVaultQuery;
  const { data: assetPricesData } = assetPricesQuery;

  const { assetPrice = 0 } = basicVaultData ?? {};
  const {
    priceChangePercent = 0,
    highPrice = 0,
    lowPrice = 0,
  } = assetPricesData ?? {};

  const isPositiveChange = priceChangePercent >= 0;

  const formattedAssetPrice = currencyFormatter.format(assetPrice);
  const formattedPriceChange = numberFormatter.format(priceChangePercent);
  const formattedHighPrice = currencyFormatter.format(highPrice);
  const formattedLowPrice = currencyFormatter.format(lowPrice);

  return (
    <Container>
      <TitleContainer>
        <OptionSelect />
      </TitleContainer>
      <PricesContainer>
        <PriceContainer>
          <SubTitle>Current Price</SubTitle>
          <PriceTitle>{formattedAssetPrice}</PriceTitle>
        </PriceContainer>
        <PriceContainer>
          <SubTitle>24h Change</SubTitle>
          <PriceChangeTitle isPositive={isPositiveChange}>{`${
            isPositiveChange ? `+${formattedPriceChange}` : formattedPriceChange
          }%`}</PriceChangeTitle>
        </PriceContainer>
        <PriceContainer>
          <SubTitle>24h High</SubTitle>
          <PriceTitle>{formattedHighPrice}</PriceTitle>
        </PriceContainer>
        <PriceContainer>
          <SubTitle>24h Low</SubTitle>
          <PriceTitle>{formattedLowPrice}</PriceTitle>
        </PriceContainer>
      </PricesContainer>
    </Container>
  );
};
