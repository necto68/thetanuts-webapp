/* eslint-disable new-cap */

import Big from "big.js";
import type { Provider } from "@ethersproject/providers";

import {
  convertToBig,
  getAnnualPercentageYield,
  normalizeVaultValue,
} from "../../vault/helpers";
import {
  PriceFeedAbi__factory as PriceFeedAbiFactory,
  VaultAbi__factory as VaultAbiFactory,
} from "../../contracts/types";
import type { Vault } from "../types";

export const vaultFetcher = async (
  vaultAddress: string,
  provider: Provider
): Promise<Vault> => {
  const vaultContract = VaultAbiFactory.connect(vaultAddress, provider);

  const lpDivisor = new Big(10).pow(18);
  const priceDivisor = new Big(10).pow(6);

  const [
    epoch,
    priceFeedAddress,
    linkAggregator,
    totalSupply,
    premium,
    period,
  ] = await Promise.all([
    vaultContract.epoch(),
    vaultContract.PRICE_FEED(),
    vaultContract.LINK_AGGREGATOR(),
    vaultContract.totalSupply(),
    vaultContract.currentEpochPremium().then(convertToBig),
    vaultContract.PERIOD().then(convertToBig),
  ]);

  const priceFeedContract = PriceFeedAbiFactory.connect(
    priceFeedAddress,
    provider
  );

  // getting valuePerLP and assetPrice
  const [valuePerLP, assetPrice] = await Promise.all([
    vaultContract
      .valuePerLPX1e18(epoch)
      .then(convertToBig)
      .then((value) => value.div(lpDivisor)),
    priceFeedContract
      .getLatestPriceX1e6(linkAggregator)
      .then(convertToBig)
      .then((priceValue) => normalizeVaultValue(priceValue, priceDivisor)),
  ]);
  const totalAsset = convertToBig(totalSupply).mul(valuePerLP);

  // getting annual Percentage Yield
  const annualPercentageYield = getAnnualPercentageYield(
    totalAsset,
    premium,
    period
  );

  return {
    valuePerLP,
    assetPrice,
    annualPercentageYield,
  };
};
