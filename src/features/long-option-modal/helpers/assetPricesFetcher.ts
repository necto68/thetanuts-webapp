import type { AssetPrices, AssetPricesResponse } from "../types/AssetPrices";

export const assetPricesFetcher = async (
  chartSymbol: string
): Promise<AssetPrices> => {
  const url = `https://api.binance.com/api/v1/ticker/24hr?symbol=${chartSymbol}`;

  const response = await fetch(url);

  const json = (await response.json()) as AssetPricesResponse;

  const { symbol, openPrice, lastPrice, highPrice, lowPrice } = json;

  const priceChangePercent =
    ((Number(lastPrice) - Number(openPrice)) / Number(openPrice)) * 100;

  return {
    symbol,
    priceChangePercent,
    highPrice: Number(highPrice),
    lowPrice: Number(lowPrice),
  };
};
