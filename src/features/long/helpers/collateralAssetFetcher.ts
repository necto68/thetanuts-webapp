import type { Provider } from "@ethersproject/providers";

import {
  LendingPoolAddressesProviderAbi__factory as LendingPoolAddressesProviderAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
  PriceOracleAbi__factory as PriceOracleAbiFactory,
} from "../../contracts/types";
import { tokenFetcher } from "../../index-vault-modal/helpers";
import { queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { convertToBig } from "../../shared/helpers/converters";
import type { CollateralAsset } from "../types";

export const collateralAssetFetcher = async (
  id: string,
  collateralAssetAddress: string,
  lendingPoolAddressesProviderAddress: string,
  provider: Provider,
  account: string
): Promise<CollateralAsset> => {
  const lendingPoolAddressesProviderContract =
    LendingPoolAddressesProviderAbiFactory.connect(
      lendingPoolAddressesProviderAddress,
      provider
    );

  const [lendingPoolAddress, priceOracleAddress] = await Promise.all([
    lendingPoolAddressesProviderContract.getLendingPool(),
    lendingPoolAddressesProviderContract.getPriceOracle(),
  ]);

  const lendingPoolContract = LendingPoolAbiFactory.connect(
    lendingPoolAddress,
    provider
  );

  const priceOracleContract = PriceOracleAbiFactory.connect(
    priceOracleAddress,
    provider
  );

  const [
    collateralToken,
    aTokenAddress,
    lendingPoolConfiguration,
    collateralPrice,
  ] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.token, collateralAssetAddress, lendingPoolAddress, account],
      async () =>
        await tokenFetcher(
          collateralAssetAddress,
          lendingPoolAddress,
          provider,
          account
        )
    ),
    lendingPoolContract
      .getReserveData(collateralAssetAddress)
      .then((data) => data.aTokenAddress),
    lendingPoolContract
      .getConfiguration(collateralAssetAddress)
      .then(({ data }) => convertToBig(data).toNumber()),
    priceOracleContract
      .getAssetPrice(collateralAssetAddress)
      .then((value) => convertToBig(value).toNumber()),
  ]);

  const [aToken] = await Promise.all([
    queryClient.fetchQuery(
      [QueryType.token, aTokenAddress, lendingPoolAddress, account],
      async () =>
        await tokenFetcher(aTokenAddress, lendingPoolAddress, provider, account)
    ),
  ]);

  const {
    symbol: collateralTokenSymbol,
    balance: collateralTokenBalance,
    chainId,
  } = collateralToken;

  const { balance: aTokenBalance } = aToken;

  // LTV first 16 bits, LIQ next 16 bits, LIQ_PENALTY next 16 bits - shifted by 10000
  const loanToValue = (lendingPoolConfiguration % 65_536) / 10_000;

  const availableLeverage = 1 / (1 - loanToValue) - 1;

  return {
    id,
    chainId,
    collateralToken,
    collateralTokenSymbol,
    collateralTokenBalance,
    aTokenBalance,
    loanToValue,
    collateralPrice,
    availableLeverage,
    lendingPoolAddress,
    priceOracleAddress,
  };
};
