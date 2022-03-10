/* eslint-disable new-cap */

import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { convertToBig, normalizeVaultValue } from "../../vault/helpers";
import { VaultType } from "../../vault/constants";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  IndexVaultAbi__factory as IndexVaultAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
  AddressesProviderAbi__factory as AddressesProviderAbiFactory,
  PriceOracleAbi__factory as PriceOracleAbiFactory,
  PriceFeedAbi__factory as PriceFeedAbiFactory,
} from "../../contracts/types";
import type { IndexVault, VaultInfo } from "../types";
import { queryClient } from "../../shared/helpers";
import { indexVaults } from "../../theta-index/constants";
import type { ChainId } from "../../wallet/constants";

import { vaultFetcher } from "./vaultFetcher";
import { getTotalAnnualPercentageYield, getTotalValueLocked } from "./utils";

export const indexVaultFetcher = async (
  id: string,
  indexVaultAddress: string,
  lendingPoolAddress: string,
  provider: Provider
): Promise<IndexVault> => {
  const priceDivisor = new Big(10).pow(6);

  const indexVaultContract = IndexVaultAbiFactory.connect(
    indexVaultAddress,
    provider
  );

  const lendingPoolContract = LendingPoolAbiFactory.connect(
    lendingPoolAddress,
    provider
  );

  const [
    { chainId },
    name,
    totalWeight,
    vaultsLength,
    assetTokenAddress,
    indexTokenAddress,
    addressesProviderAddress,
  ] = await Promise.all([
    provider.getNetwork() as Promise<{ chainId: ChainId }>,
    indexVaultContract.name(),
    indexVaultContract.totalWeight().then(convertToBig),
    indexVaultContract.vaultsLength().then((bigNumber) => bigNumber.toNumber()),
    indexVaultContract.COLLAT(),
    lendingPoolContract
      .getReserveData(indexVaultAddress)
      .then((data) => data.aTokenAddress),
    lendingPoolContract.getAddressesProvider(),
  ]);

  const assetTokenContract = Erc20AbiFactory.connect(
    assetTokenAddress,
    provider
  );

  const addressesProviderContract = AddressesProviderAbiFactory.connect(
    addressesProviderAddress,
    provider
  );

  // getting vaults addresses
  const vaultsAddressesPromises: Promise<string>[] = Array.from(
    { length: vaultsLength },
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (element, index) => indexVaultContract.vaultAddress(index)
  );

  const [assetSymbol, assetDecimals, priceOracleAddress, ...vaultsAddresses] =
    await Promise.all([
      assetTokenContract.symbol(),
      assetTokenContract.decimals(),
      addressesProviderContract.getPriceOracle(),
      ...vaultsAddressesPromises,
    ] as const);

  // getting type
  const indexVaultType = name.split(" ").at(-1) ?? "";
  const type = indexVaultType === "CALL" ? VaultType.CALL : VaultType.PUT;

  // creating vaultsInfosDataPromises
  const vaultsInfosDataPromises = vaultsAddresses.map(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (vaultAddress) => indexVaultContract.vaults(vaultAddress)
  );

  // getting indexLinkAggregator and vaultsInfosData
  const priceOracleContract = PriceOracleAbiFactory.connect(
    priceOracleAddress,
    provider
  );

  const [indexLinkAggregator, ...vaultsInfosData] = await Promise.all([
    priceOracleContract.getSourceOfAsset(indexVaultAddress),
    ...vaultsInfosDataPromises,
  ] as const);

  // getting vaults
  const vaults = await Promise.all(
    vaultsAddresses.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (vaultAddress) =>
        queryClient.fetchQuery(
          [vaultAddress, chainId],
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          () => vaultFetcher(vaultAddress, provider)
        )
    )
  );

  const vaultsInfos: VaultInfo[] = vaultsInfosData.map((vaultInfo) => {
    const assetDivisor = new Big(10).pow(assetDecimals);
    const lpAmount = convertToBig(vaultInfo.amount).div(assetDivisor);
    const weight = convertToBig(vaultInfo.weight);

    const allocation = weight.div(totalWeight).mul(100).round(2).toNumber();

    return {
      lpAmount,
      weight,
      allocation,
    };
  });

  // getting assetPrice and indexPrice
  const [{ priceFeedAddress, assetPrice }] = vaults;

  const priceFeedContract = PriceFeedAbiFactory.connect(
    priceFeedAddress,
    provider
  );

  const indexPrice = await priceFeedContract
    .getLatestPriceX1e6(indexLinkAggregator)
    .then(convertToBig)
    .then((priceValue) => normalizeVaultValue(priceValue, priceDivisor));

  const totalValueLocked = getTotalValueLocked(vaults, vaultsInfos);

  const totalAnnualPercentageYield = getTotalAnnualPercentageYield(
    vaults,
    vaultsInfos,
    totalWeight
  );

  const tokenConfig = indexVaults.find(
    ({ id: indexVaultId }) => indexVaultId === id
  );

  const { replications = [] } = tokenConfig ?? {};

  const supportedChainIds = [chainId].concat(
    replications.map((replication) => replication.chainId)
  );

  return {
    id,
    type,
    assetSymbol,
    assetPrice,
    assetTokenAddress,
    indexPrice,
    indexTokenAddress,
    vaults,
    vaultsInfos,
    totalWeight,
    totalValueLocked,
    totalAnnualPercentageYield,
    chainId,
    supportedChainIds,
  };
};
