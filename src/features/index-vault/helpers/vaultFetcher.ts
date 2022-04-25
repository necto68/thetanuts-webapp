/* eslint-disable new-cap */

import Big from "big.js";
import type { Provider } from "@ethersproject/providers";

import {
  Erc20Abi__factory as Erc20AbiFactory,
  PriceFeedAbi__factory as PriceFeedAbiFactory,
  VaultAbi__factory as VaultAbiFactory,
} from "../../contracts/types";
import type { Vault } from "../types";
import { convertToBig } from "../../shared/helpers";

import { getPercentageYields, normalizeVaultValue } from "./utils";

export const vaultFetcher = async (
  vaultAddress: string,
  provider: Provider
): Promise<Vault> => {
  const vaultContract = VaultAbiFactory.connect(vaultAddress, provider);

  const lpDivisor = new Big(10).pow(18);
  const priceDivisor = new Big(10).pow(6);

  const [
    assetTokenAddress,
    epoch,
    expiry,
    priceFeedAddress,
    linkAggregator,
    totalSupply,
    collatCapWei,
    premium,
    period,
  ] = await Promise.all([
    vaultContract.COLLAT(),
    vaultContract.epoch(),
    vaultContract
      .expiry()
      .then(convertToBig)
      .then((expiryBig) => expiryBig.mul(1000).toNumber()),
    vaultContract.priceFeed(),
    vaultContract.LINK_AGGREGATOR(),
    vaultContract.totalSupply(),
    vaultContract.collatCap().then(convertToBig),
    vaultContract.currentEpochPremium().then(convertToBig),
    vaultContract
      .PERIOD()
      .then(convertToBig)
      .then((periodBig) => periodBig.toNumber()),
  ]);

  const assetTokenContract = Erc20AbiFactory.connect(
    assetTokenAddress,
    provider
  );

  const priceFeedContract = PriceFeedAbiFactory.connect(
    priceFeedAddress,
    provider
  );

  // getting assetSymbol, currentStrikePrice, valuePerLP and assetPrice
  const [
    assetSymbol,
    decimals,
    balanceWei,
    currentStrikePrice,
    valuePerLP,
    assetPrice,
  ] = await Promise.all([
    assetTokenContract.symbol(),
    assetTokenContract.decimals(),
    assetTokenContract.balanceOf(vaultAddress).then(convertToBig),
    vaultContract
      .strikeX1e6(epoch)
      .then(convertToBig)
      .then((priceValue) => normalizeVaultValue(priceValue, priceDivisor)),
    vaultContract
      .valuePerLPX1e18(epoch)
      .then(convertToBig)
      .then((value) => value.div(lpDivisor)),
    priceFeedContract
      .getLatestPriceX1e6(linkAggregator)
      .then(convertToBig)
      .then((priceValue) => normalizeVaultValue(priceValue, priceDivisor)),
  ]);

  const isSettled = expiry === 0;
  const isExpired = !isSettled && Date.now() > expiry;

  const strikePrice = isSettled || isExpired ? null : currentStrikePrice;

  const totalAsset = convertToBig(totalSupply).mul(valuePerLP);

  // getting balance and collatCap
  const balanceDivisor = new Big(10).pow(decimals);
  const balance = balanceWei.div(balanceDivisor);
  const collatCap = collatCapWei.div(balanceDivisor);

  // getting annual Percentage Yield
  const percentageYields = getPercentageYields(totalAsset, premium, period);

  const { annualPercentageYield } = percentageYields;

  return {
    vaultAddress,
    priceFeedAddress,
    assetSymbol,
    expiry,
    period,
    valuePerLP,
    balance,
    collatCap,
    assetPrice,
    strikePrice,
    percentageYields,
    annualPercentageYield,
    isSettled,
    isExpired,
  };
};
