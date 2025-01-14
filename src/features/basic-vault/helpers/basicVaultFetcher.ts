/* eslint-disable new-cap */

import Big from "big.js";
import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import {
  Erc20Abi__factory as Erc20AbiFactory,
  PriceFeedAbi__factory as PriceFeedAbiFactory,
  BasicVaultAbi__factory as BasicVaultAbiFactory,
  DegenVaultAbi__factory as DegenVaultAbiFactory,
  WheelVaultAbi__factory as WheelVaultAbiFactory,
  BasicVaultDepositorAbi__factory as BasicVaultDepositorAbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers";
import {
  getPercentageYields,
  normalizeVaultValue,
} from "../../index-vault/helpers/utils";
import type { ChainId } from "../../wallet/constants";
import type { BasicVault } from "../types";
import { VaultType } from "../types";
import { BasicVaultType } from "../../basic/types";
import { RiskLevel } from "../types/BasicVault";
import { basicVaultsIdsThatSupportDepositor } from "../../basic/constants";
import { ZERO_ADDRESS } from "../../wallet/constants";

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

  const wheelVaultContract = WheelVaultAbiFactory.connect(
    basicVaultAddress,
    provider
  );

  const isDegen = basicVaultType === BasicVaultType.DEGEN;
  const isWheel = basicVaultType === BasicVaultType.WHEEL;

  const lpDivisor = new Big(10).pow(18);
  const priceDivisor = new Big(10).pow(6);
  const feeDivisor = new Big(10).pow(6);

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

    // TODO: uncomment when wheel vault epoch will be 16
    // currentEpochPremium,
    period,
    feePerYear,
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

    // TODO: uncomment when wheel vault epoch will be 16
    // vaultContract.currentEpochPremium().then(convertToBig),
    vaultContract
      .PERIOD()
      .then(convertToBig)
      .then((periodBig) => periodBig.toNumber()),
    vaultContract
      .feePerYearX1e6()
      .then(convertToBig)
      .then((feePerYearBig) => feePerYearBig.div(feeDivisor).toNumber()),
  ]);

  // TODO: remove when wheel vault epoch will be 16
  const currentEpochPremium =
    id === "TN-SMv1-ETHUSDC" && epoch === 15
      ? new Big("968000000000000000")
      : await vaultContract.currentEpochPremium().then(convertToBig);

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

  const isSettled = expiry === 0;
  const isExpired = !isSettled && Date.now() > expiry;

  // only for PUT vaults
  const splitName = name.split(" ");
  const putVaultAssetSymbol = splitName.at(-2);
  const isCondorType = splitName.at(-4) === "Condor";

  let isPutType = false;

  if (isWheel) {
    const optionType = await wheelVaultContract.optionType(
      isSettled ? epoch + 1 : epoch
    );

    isPutType = optionType === 1;
  } else {
    isPutType = splitName.at(-4) === "Put";
  }

  const isDegenOrPutType = isDegen || isPutType;

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

  let strikePrices: number[] = [];

  // get set of strike prices for degen vault
  if (isDegen) {
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
  } else {
    strikePrices = [
      await vaultContract
        .strikeX1e6(epoch)
        .then((price) =>
          normalizeVaultValue(convertToBig(price), priceDivisor)
        ),
    ];
  }

  // setup minDepositorValue and pending balance
  let minDepositorValue = new Big(0);
  let depositorFee = new Big(0);
  let pendingBalanceWei = new Big(0);

  // getting balance and collatCap
  const balanceDivisor = new Big(10).pow(collateralDecimals);
  const balance = balanceWei.add(pendingBalanceWei).div(balanceDivisor);

  // fill pending balance in case of degen vault
  if (
    basicVaultDepositorAddress &&
    basicVaultDepositorAddress !== ZERO_ADDRESS
  ) {
    const basicVaultDepositorContract = BasicVaultDepositorAbiFactory.connect(
      basicVaultDepositorAddress,
      provider
    );

    [{ minDepositorValue, depositorFee }, pendingBalanceWei] =
      await Promise.all([
        basicVaultDepositorContract
          .vaultParams(basicVaultAddress)
          .then(({ minAmt, feeAmt }) => ({
            minDepositorValue: convertToBig(minAmt).div(balanceDivisor),
            depositorFee: convertToBig(feeAmt).div(balanceDivisor),
          })),
        isDegen
          ? basicVaultDepositorContract
              .totalPending(basicVaultAddress)
              .then(convertToBig)
          : new Big(0),
      ]);
  }

  const vaultCollatCapWei =
    isWheel && isPutType
      ? await wheelVaultContract.collatCapQuote().then(convertToBig)
      : collatCapWei;

  const collatCap = vaultCollatCapWei.div(balanceDivisor);
  const remainder = collatCap.sub(balance).round(0, Big.roundDown).toNumber();

  const basicVaultRiskLevel = null;

  const riskLevel = isDegen ? RiskLevel.HIGH : basicVaultRiskLevel;

  // getting annual Percentage Yield
  const percentageYields = getPercentageYields(
    currentEpochAmount,
    currentEpochPremium,
    period
  );

  // getting annual Reward Percentage Yield
  const totalReward = new Big("23527.277335588715");

  // need to update each epoch
  const currentEpochRewardMultiplier = new Big(0.35);
  const currentEpochReward = totalReward.mul(currentEpochRewardMultiplier);

  const rewardPercentageYields = getPercentageYields(
    id === "TN-CSCCv1-STMATICUSD" ? balance : new Big(0),
    id === "TN-CSCCv1-STMATICUSD" ? currentEpochReward : new Big(0),
    period
  );

  const { annualPercentageYield } = percentageYields;
  const { annualPercentageRate: rewardAnnualPercentageRate } =
    rewardPercentageYields;

  const isSupportDepositor = basicVaultsIdsThatSupportDepositor.includes(id);

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
    feePerYear,
    depositorFee,
    minDepositorValue,
    assetPrice,
    collateralPrice,
    strikePrices,
    percentageYields,
    annualPercentageYield,
    rewardAnnualPercentageRate,
    isSettled,
    isExpired,
    isAllowInteractions,
    isSupportDepositor,
  };
};
