import type { Provider } from "@ethersproject/providers";

import { basicVaultFetcher } from "../../basic-vault/helpers";
import { basicVaultsMap } from "../../basic/constants";
import type { BasicVaultType } from "../../basic/types";
import { collateralAssets } from "../../lending-market/constants";
import { queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { collateralAssetFetcher } from "../../lending-market/helpers/collateralAssetFetcher";
import {
  LendingMarketPositionManagerAbi__factory as LendingMarketPositionManagerAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
  PriceOracleAbi__factory as PriceOracleAbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers/converters";
import { tokenFetcher } from "../../index-vault-modal/helpers";
import type { LendingMarketVaultReader } from "../types";

export const lendingMarketVaultReaderFetcher = async (
  basicVaultId: string,
  basicVaultType: BasicVaultType,
  basicVaultAddress: string,
  lendingMarketPositionManagerAddress: string,
  account: string,
  provider: Provider
): Promise<LendingMarketVaultReader> => {
  const lendingMarketPositionManagerContract =
    LendingMarketPositionManagerAbiFactory.connect(
      lendingMarketPositionManagerAddress,
      provider
    );

  const chainId = basicVaultsMap[basicVaultId]?.source.chainId ?? 0;

  const [basicVault] = await Promise.all([
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

  const { lendingPoolAddress, priceOracleAddress } = collateralAsset;

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
        ? lendingMarketPositionManagerContract.callStatic
            .cancelQueue(basicVaultAddress, lendingPoolAddress, {
              from: account,
            })
            .then((value) => convertToBig(value))
        : null,
    ]);

  const [debtToken] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.token, debtTokenAddress, null, account],
      async () => await tokenFetcher(debtTokenAddress, null, provider, account)
    ),
  ]);

  const borrowPending = rawBorrowPending
    ? rawBorrowPending.div(debtToken.tokenDivisor)
    : null;

  const currentPosition = rawBorrowPending ? debtToken.balance : null;

  const totalPosition =
    currentPosition && borrowPending
      ? currentPosition.add(borrowPending)
      : null;

  return {
    collateralAsset,
    debtToken,
    debtTokenPrice,
    totalPosition,
    currentPosition,
    borrowPending,
  };
};
