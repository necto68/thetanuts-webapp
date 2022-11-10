import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { basicVaultFetcher } from "../../basic-vault/helpers";
import { basicVaultsMap } from "../../basic/constants";
import type { BasicVaultType } from "../../basic/types";
import { collateralAssets } from "../../long/constants";
import { queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { collateralAssetFetcher } from "../../long/helpers/collateralAssetFetcher";
import {
  LongVaultPositionManagerAbi__factory as LongVaultPositionManagerAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
  ProtocolDataProviderAbi__factory as ProtocolDataProviderAbiFactory,
  PriceOracleAbi__factory as PriceOracleAbiFactory,
  DebtTokenAbi__factory as DebtTokenAbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers/converters";
import { tokenFetcher } from "../../index-vault-modal/helpers";
import type { LongVaultReader } from "../types";

export const longVaultReaderFetcher = async (
  basicVaultId: string,
  basicVaultType: BasicVaultType,
  basicVaultAddress: string,
  longVaultPositionManagerAddress: string,
  longVaultProtocolDataProviderAddress: string,
  account: string,
  provider: Provider
): Promise<LongVaultReader> => {
  const longVaultPositionManagerContract =
    LongVaultPositionManagerAbiFactory.connect(
      longVaultPositionManagerAddress,
      provider
    );

  const longVaultProtocolDataProviderContract =
    ProtocolDataProviderAbiFactory.connect(
      longVaultProtocolDataProviderAddress,
      provider
    );

  const chainId = basicVaultsMap[basicVaultId]?.source.chainId ?? 0;

  const [
    basicVault,
    {
      availableLiquidity: rawAvailableLiquidity,
      totalVariableDebt: rawTotalVariableDebt,
    },
  ] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.basicVault, basicVaultId, basicVaultType, chainId],

      async () =>
        await basicVaultFetcher(
          basicVaultId,
          basicVaultType,
          basicVaultAddress,
          provider
        )
    ),
    longVaultProtocolDataProviderContract.getReserveData(basicVaultAddress),
  ]);

  const { collateralTokenAddress } = basicVault;

  const collateralAssetConfig =
    collateralAssets.find(
      ({ source }) =>
        source.collateralAssetAddress.toLowerCase() ===
        collateralTokenAddress.toLowerCase()
    ) ?? collateralAssets[0];

  const {
    id: collateralAssetId,
    source: { collateralAssetAddress, lendingPoolAddressesProviderAddress },
  } = collateralAssetConfig;

  const [collateralAsset] = await Promise.all([
    queryClient.fetchQuery(
      [
        QueryType.collateralAsset,
        collateralAssetId,
        collateralAssetAddress,
        lendingPoolAddressesProviderAddress,
        account,
      ],

      async () =>
        await collateralAssetFetcher(
          collateralAssetId,
          collateralAssetAddress,
          lendingPoolAddressesProviderAddress,
          provider,
          account
        )
    ),
  ]);

  const {
    loanToValue,
    collateralPrice,
    lendingPoolAddress,
    priceOracleAddress,
  } = collateralAsset;

  const lendingPoolContract = LendingPoolAbiFactory.connect(
    lendingPoolAddress,
    provider
  );

  const priceOracleContract = PriceOracleAbiFactory.connect(
    priceOracleAddress,
    provider
  );

  const [debtTokenPrice, debtTokenAddress, rawBorrowPending] =
    await Promise.all([
      priceOracleContract
        .getAssetPrice(basicVaultAddress)
        .then((value) => convertToBig(value).toNumber()),
      lendingPoolContract
        .getReserveData(basicVaultAddress)
        .then((data) => data.variableDebtTokenAddress),
      account
        ? longVaultPositionManagerContract.callStatic
            .cancelQueue(basicVaultAddress, lendingPoolAddress, {
              from: account,
            })
            .then(convertToBig)
        : null,
    ]);

  const balanceDivisor = new Big(10).pow(18);
  const availableLiquidity = convertToBig(rawAvailableLiquidity).div(
    balanceDivisor
  );
  const totalVariableDebt =
    convertToBig(rawTotalVariableDebt).div(balanceDivisor);

  const supplyCap = availableLiquidity.add(totalVariableDebt);

  const borrowRemainder = supplyCap
    .mul(0.9)
    .sub(totalVariableDebt)
    .round(5, Big.roundDown)
    .toNumber();

  const availableForBorrow = new Big(borrowRemainder)
    .mul(debtTokenPrice)
    .mul(1 - loanToValue);

  const supplyRemainder = availableForBorrow
    .div(loanToValue)
    .div(collateralPrice)
    .round(5, Big.roundDown)
    .toNumber();

  const balance = supplyCap.sub(supplyRemainder);

  const debtTokenContract = DebtTokenAbiFactory.connect(
    debtTokenAddress,
    provider
  );

  const [debtToken, rawBorrowAllowance] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.token, debtTokenAddress, null, account],
      async () => await tokenFetcher(debtTokenAddress, null, provider, account)
    ),
    account
      ? debtTokenContract
          .borrowAllowance(account, longVaultPositionManagerAddress)
          .then(convertToBig)
      : null,
  ]);

  const borrowPending = rawBorrowPending
    ? rawBorrowPending.div(debtToken.tokenDivisor)
    : null;

  const borrowAllowance = rawBorrowAllowance
    ? rawBorrowAllowance.div(debtToken.tokenDivisor)
    : null;

  const currentPosition = rawBorrowPending ? debtToken.balance : null;

  const totalPosition =
    currentPosition && borrowPending
      ? currentPosition.add(borrowPending)
      : null;

  const contractsMultiplier = collateralPrice / debtTokenPrice;

  const [
    totalContractsPosition,
    currentContractsPosition,
    borrowContractsPending,
  ] = [totalPosition, currentPosition, borrowPending].map((value) =>
    value ? value.mul(contractsMultiplier) : null
  );

  return {
    collateralAsset,
    debtToken,
    debtTokenPrice,
    borrowAllowance,
    totalContractsPosition,
    currentContractsPosition,
    borrowContractsPending,
    balance,
    supplyCap,
    supplyRemainder,
    borrowRemainder,
  };
};
