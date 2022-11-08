/* eslint-disable new-cap */

import Big from "big.js";
import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import {
  Erc20Abi__factory as Erc20AbiFactory,
  PriceFeedAbi__factory as PriceFeedAbiFactory,
  BasicVaultAbi__factory as BasicVaultAbiFactory,
  DegenVaultAbi__factory as DegenVaultAbiFactory,
  BasicVaultDepositorAbi__factory as BasicVaultDepositorAbiFactory,
} from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import {
  getPercentageYields,
  normalizeVaultValue,
} from "../../index-vault/helpers/utils";
import type { ChainId } from "../../wallet/constants";
import type { BasicVault } from "../types";
import { VaultType } from "../types";
import { QueryType } from "../../shared/types";
import { BasicVaultType } from "../../basic/types";
import { RiskLevel } from "../types/BasicVault";

import { basicVaultRiskLevelFetcher } from "./basicVaultRiskLevelFetcher";

// eslint-disable-next-line complexity
export const basicVaultFetcher = async (
  id: string,
  basicVaultType: BasicVaultType,
  basicVaultAddress: string,
  provider: Provider,
  basicVaultDepositorAddress?: string
): Promise<BasicVault> => {
  const vaultContract = BasicVaultAbiFactory.connect(
    basicVaultAddress,
    provider
  );

  const degenVaultContract = DegenVaultAbiFactory.connect(
    basicVaultAddress,
    provider
  );

  const isDegenBasicVaultType = basicVaultType === BasicVaultType.DEGEN;
  const isBasicVaultType = basicVaultType === BasicVaultType.BASIC;

  const lpDivisor = new Big(10).pow(18);
  const priceDivisor = new Big(10).pow(6);

  const [
    { chainId },
    collateralTokenAddress,
    name,
    epoch,
    expiry,
    isAllowInteractions,
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
    vaultContract.allowInteractions(),
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

  // getting assetSymbol, valuePerLP and assetPrice
  const [
    collateralSymbol,
    collateralDecimals,
    balanceWei,
    valuePerLP,
    assetPrice,
  ] = await Promise.all([
    collateralTokenContract.symbol(),
    collateralTokenContract.decimals(),
    collateralTokenContract.balanceOf(basicVaultAddress).then(convertToBig),
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
  const isCondorType = splitName.at(-4) === "Condor";

  const isDegenOrPutType = isDegenBasicVaultType || isPutType;

  const assetSymbol =
    isDegenOrPutType && putVaultAssetSymbol
      ? putVaultAssetSymbol
      : collateralSymbol;

  // for DEGEN vaults and PUT vaults - collateralPrice always will be 1$
  const collateralPrice = isDegenOrPutType ? 1 : assetPrice;

  let type = VaultType.CALL;

  if (isPutType) {
    type = VaultType.PUT;
  } else if (isCondorType) {
    type = VaultType.CONDOR;
  } else {
    type = VaultType.CALL;
  }

  const isSettled = expiry === 0;
  const isExpired = !isSettled && Date.now() > expiry;

  let strikePrices: number[] = [];

  if (isBasicVaultType) {
    strikePrices = [
      await vaultContract
        .strikeX1e6(epoch)
        .then((price) =>
          normalizeVaultValue(convertToBig(price), priceDivisor)
        ),
    ];
  }

  // get set of strike prices for degen vault
  if (isDegenBasicVaultType) {
    const [
      soldPutStrikePrice,
      soldCallStrikePrice,
      boughtPutStrikePrice,
      boughtCallStrikePrice,
    ] = isCondorType
      ? await Promise.all([
          // 4 values for condor vault
          degenVaultContract.strikeX1e6(epoch, 3),
          degenVaultContract.strikeX1e6(epoch, 1),
          degenVaultContract.strikeX1e6(epoch, 2),
          degenVaultContract.strikeX1e6(epoch, 0),
        ])
      : await Promise.all([
          // 2 values for spread vault
          degenVaultContract.strikeX1e6(epoch, 0),
          BigNumber.from(0),
          degenVaultContract.strikeX1e6(epoch, 1),
          BigNumber.from(0),
        ]);

    strikePrices = [
      soldPutStrikePrice,
      soldCallStrikePrice,
      boughtPutStrikePrice,
      boughtCallStrikePrice,
    ].map((priceValue) =>
      normalizeVaultValue(convertToBig(priceValue), priceDivisor)
    );
  }

  // setup pending balance
  let pendingBalanceWei = new Big(0);

  // fill pending balance in case of degen vault
  if (isDegenBasicVaultType && basicVaultDepositorAddress) {
    const basicVaultDepositorContract = BasicVaultDepositorAbiFactory.connect(
      basicVaultDepositorAddress,
      provider
    );

    pendingBalanceWei = await basicVaultDepositorContract
      .totalPending(basicVaultAddress)
      .then(convertToBig);
  }

  // getting balance and collatCap
  const balanceDivisor = new Big(10).pow(collateralDecimals);
  const balance = balanceWei.add(pendingBalanceWei).div(balanceDivisor);
  const collatCap = collatCapWei.div(balanceDivisor);
  const remainder = collatCap.sub(balance).round(0, Big.roundDown).toNumber();

  // getting riskLevel
  const basicVaultRiskLevel = await queryClient.fetchQuery(
    [QueryType.riskLevel, assetSymbol, type],
    async () => await basicVaultRiskLevelFetcher(assetSymbol, type)
  );

  const riskLevel = isDegenBasicVaultType
    ? RiskLevel.HIGH
    : basicVaultRiskLevel;

  // getting annual Percentage Yield
  const percentageYields = getPercentageYields(
    currentEpochAmount,
    currentEpochPremium,
    period
  );

  const { annualPercentageYield } = percentageYields;

  return {
    id,
    basicVaultType,
    basicVaultAddress,
    chainId,
    type,
    priceFeedAddress,
    assetSymbol,
    collateralSymbol,
    collateralDecimals,
    collateralTokenAddress,
    riskLevel,
    epoch,
    expiry,
    period,
    valuePerLP,
    balance,
    remainder,
    collatCap,
    assetPrice,
    collateralPrice,
    strikePrices,
    percentageYields,
    annualPercentageYield,
    isSettled,
    isExpired,
    isAllowInteractions,
  };
};
