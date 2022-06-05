/* eslint-disable new-cap */

import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { VaultType } from "../types";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  IndexVaultAbi__factory as IndexVaultAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
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
import { middleIndexPriceFetcher } from "./middleIndexPriceFetcher";

export const indexVaultFetcher = async (
  id: string,
  indexVaultAddress: string,
  routerAddress: string,
  lendingPoolAddress: string,
  assetPriceFeedAddress: string,
  indexPriceFeedAddress: string,
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
  ] = await Promise.all([
    provider.getNetwork() as Promise<{ chainId: ChainId }>,
    indexVaultContract.name(),
    indexVaultContract.totalWeight().then(convertToBig),
    indexVaultContract.vaultsLength().then((bigNumber) => bigNumber.toNumber()),
    indexVaultContract.COLLAT(),
    lendingPoolContract
      .getReserveData(indexVaultAddress)
      .then((data) => data.aTokenAddress),
  ]);

  const assetTokenContract = Erc20AbiFactory.connect(
    assetTokenAddress,
    provider
  );

  // getting vaults addresses
  const vaultsAddressesPromises: Promise<string>[] = Array.from(
    { length: vaultsLength },
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (element, index) => indexVaultContract.vaultAddress(index)
  );

  const [assetSymbol, assetDecimals, ...vaultsAddresses] = await Promise.all([
    assetTokenContract.symbol(),
    assetTokenContract.decimals(),
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

  // getting vaultsInfosData
  const vaultsInfosData = await Promise.all(vaultsInfosDataPromises);

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

    const allocation = weight.div(totalWeight).mul(100).round(6).toNumber();

    return {
      lpAmount,
      weight,
      allocation,
    };
  });

  // getting assetPrice, oracleIndexPrice and middleIndexPrice
  const [{ priceFeedAddress }] = vaults;

  const priceFeedContract = PriceFeedAbiFactory.connect(
    priceFeedAddress,
    provider
  );

  const [assetPrice, oracleIndexPrice] = await Promise.all([
    priceFeedContract.getLatestPriceX1e6(assetPriceFeedAddress),
    priceFeedContract.getLatestPriceX1e6(indexPriceFeedAddress),
  ]).then((priceValues) =>
    priceValues
      .map(convertToBig)
      .map((priceValue) => normalizeVaultValue(priceValue, priceDivisor))
  );

  const middleIndexPrice = await queryClient.fetchQuery(
    [
      QueryType.middleIndexPrice,
      assetPrice,
      assetTokenAddress,
      indexTokenAddress,
      routerAddress,
    ],
    async () =>
      await middleIndexPriceFetcher(
        assetPrice,
        assetTokenAddress,
        indexTokenAddress,
        routerAddress,
        provider
      )
  );

  const totalValueLocked = getTotalValueLocked(vaults, vaultsInfos, assetPrice);

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
    oracleIndexPrice,
    middleIndexPrice,
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
