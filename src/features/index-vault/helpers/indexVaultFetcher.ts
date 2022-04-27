/* eslint-disable new-cap */

import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { VaultType } from "../types";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  IndexVaultAbi__factory as IndexVaultAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
  AddressesProviderAbi__factory as AddressesProviderAbiFactory,
  PriceOracleAbi__factory as PriceOracleAbiFactory,
  PriceFeedAbi__factory as PriceFeedAbiFactory,
} from "../../contracts/types";
import type { IndexVault, VaultInfo } from "../types";
import { queryClient, convertToBig } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { indexVaultsMap } from "../../theta-index/constants";
import type { ChainId } from "../../wallet/constants";
import { chains } from "../../wallet/constants";

import {
  normalizeVaultValue,
  getTotalPercentageYields,
  getTotalValueLocked,
  getTotalRemainder,
} from "./utils";
import { vaultFetcher } from "./vaultFetcher";

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

  const [assetLinkAggregator, indexLinkAggregator, ...vaultsInfosData] =
    await Promise.all([
      priceOracleContract.getSourceOfAsset(assetTokenAddress),
      priceOracleContract.getSourceOfAsset(indexVaultAddress),
      ...vaultsInfosDataPromises,
    ] as const);

  // getting vaults
  const vaults = await Promise.all(
    vaultsAddresses.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (vaultAddress) =>
        queryClient.fetchQuery(
          [QueryType.vault, vaultAddress, chainId],
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
  const [{ priceFeedAddress }] = vaults;

  const priceFeedContract = PriceFeedAbiFactory.connect(
    priceFeedAddress,
    provider
  );

  const [assetPrice, indexPrice] = await Promise.all([
    priceFeedContract.getLatestPriceX1e6(assetLinkAggregator),
    priceFeedContract.getLatestPriceX1e6(indexLinkAggregator),
  ]).then((priceValues) =>
    priceValues
      .map(convertToBig)
      .map((priceValue) => normalizeVaultValue(priceValue, priceDivisor))
  );

  const totalValueLocked = getTotalValueLocked(vaults, vaultsInfos);

  const totalPercentageYields = getTotalPercentageYields(
    vaults,
    vaultsInfos,
    totalWeight
  );

  const totalRemainder = getTotalRemainder(vaults);

  const tokenConfig = indexVaultsMap[id];

  const { replications = [] } = tokenConfig ?? {};

  const supportedChainIds = [chainId]
    .concat(replications.map((replication) => replication.chainId))
    .sort((a, b) => {
      const aChainIdIndex = chains.findIndex((chain) => chain.chainId === a);
      const bChainIdIndex = chains.findIndex((chain) => chain.chainId === b);

      return aChainIdIndex - bChainIdIndex;
    });

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
    totalRemainder,
    totalPercentageYields,
    chainId,
    supportedChainIds,
  };
};
