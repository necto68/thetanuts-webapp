/* eslint-disable new-cap */

import Big from "big.js";
import type { Provider } from "@ethersproject/providers";

import {
  Erc20Abi__factory as Erc20AbiFactory,
  PriceFeedAbi__factory as PriceFeedAbiFactory,
  BasicVaultAbi__factory as BasicVaultAbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers";
import {
  getPercentageYields,
  normalizeVaultValue,
} from "../../index-vault/helpers/utils";
import type { ChainId } from "../../wallet/constants";
import type { BasicVault } from "../types";
import { VaultType } from "../types";

export const basicVaultFetcher = async (
  id: string,
  basicVaultAddress: string,
  provider: Provider
): Promise<BasicVault> => {
  const vaultContract = BasicVaultAbiFactory.connect(
    basicVaultAddress,
    provider
  );

  const lpDivisor = new Big(10).pow(18);
  const priceDivisor = new Big(10).pow(6);

  const [
    { chainId },
    collateralTokenAddress,
    name,
    epoch,
    expiry,
    priceFeedAddress,
    linkAggregator,
    collatCapWei,
    currentEpochAmount,
    currentEpochPremium,
    period,
  ] = await Promise.all([
    provider.getNetwork() as Promise<{ chainId: ChainId }>,
    vaultContract.COLLAT(),
    vaultContract.name(),
    vaultContract
      .epoch()
      .then(convertToBig)
      .then((epochBig) => epochBig.toNumber()),
    vaultContract
      .expiry()
      .then(convertToBig)
      .then((expiryBig) => expiryBig.mul(1000).toNumber()),
    vaultContract.priceReader(),
    vaultContract.LINK_AGGREGATOR(),
    vaultContract.collatCap().then(convertToBig),
    vaultContract.currentEpochAmount().then(convertToBig),
    vaultContract.currentEpochPremium().then(convertToBig),
    vaultContract
      .PERIOD()
      .then(convertToBig)
      .then((periodBig) => periodBig.toNumber()),
  ]);

  const collateralTokenContract = Erc20AbiFactory.connect(
    collateralTokenAddress,
    provider
  );

  const priceFeedContract = PriceFeedAbiFactory.connect(
    priceFeedAddress,
    provider
  );

  // getting assetSymbol, currentStrikePrice, valuePerLP and assetPrice
  const [
    collateralSymbol,
    collateralDecimals,
    balanceWei,
    currentStrikePrice,
    valuePerLP,
    assetPrice,
  ] = await Promise.all([
    collateralTokenContract.symbol(),
    collateralTokenContract.decimals(),
    collateralTokenContract.balanceOf(basicVaultAddress).then(convertToBig),
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

  // only for PUT vaults
  const splitName = name.split(" ");
  const putVaultAssetSymbol = splitName.at(-2);
  const isPutType = splitName.at(-4) === "Put";
  const assetSymbol =
    isPutType && putVaultAssetSymbol ? putVaultAssetSymbol : collateralSymbol;

  // for PUT vaults - collateralPrice always will be 1$
  const collateralPrice = isPutType ? 1 : assetPrice;

  const type = isPutType ? VaultType.PUT : VaultType.CALL;

  const isSettled = expiry === 0;
  const isExpired = !isSettled && Date.now() > expiry;

  const strikePrice = isSettled || isExpired ? null : currentStrikePrice;

  // getting balance and collatCap
  const balanceDivisor = new Big(10).pow(collateralDecimals);
  const balance = balanceWei.div(balanceDivisor);
  const collatCap = collatCapWei.div(balanceDivisor);
  const remainder = collatCap.sub(balance).round(0, Big.roundDown).toNumber();

  // getting annual Percentage Yield
  const percentageYields = getPercentageYields(
    currentEpochAmount,
    currentEpochPremium,
    period
  );

  const { annualPercentageYield } = percentageYields;

  return {
    id,
    basicVaultAddress,
    chainId,
    type,
    priceFeedAddress,
    assetSymbol,
    collateralSymbol,
    collateralDecimals,
    collateralTokenAddress,
    epoch,
    expiry,
    period,
    valuePerLP,
    balance,
    remainder,
    collatCap,
    assetPrice,
    collateralPrice,
    strikePrice,
    percentageYields,
    annualPercentageYield,
    isSettled,
    isExpired,
  };
};
