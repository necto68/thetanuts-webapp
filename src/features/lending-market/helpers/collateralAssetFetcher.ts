import type { Provider } from "@ethersproject/providers";

import {
  LendingPoolAddressesProviderAbi__factory as LendingPoolAddressesProviderAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
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

  const [collateralToken, lendingPoolConfiguration] = await Promise.all([
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
      .getConfiguration(collateralAssetAddress)
      .then(({ data }) => convertToBig(data).toNumber()),
  ]);

  // LTV first 16 bits, LIQ next 16 bits, LIQ_PENALTY next 16 bits - shifted by 10000
  const loanToValue = (lendingPoolConfiguration % 65_536) / 10_000;

  // 0.05 buffer
  const availableLeverage = 1 / (1 - loanToValue) - 1.05;

  return {
    id,
    token: collateralToken,
    loanToValue,
    availableLeverage,
    lendingPoolAddress,
    priceOracleAddress,
  };
};
