/* eslint-disable new-cap */

import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import {
  Erc20Abi__factory as Erc20AbiFactory,
  IndexVaultAbi__factory as IndexVaultAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
  PriceFeedAbi__factory as PriceFeedAbiFactory,
} from "../../contracts/types";
import type { IndexVault, BasicVaultInfo } from "../types";
import { queryClient, convertToBig } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { indexVaultsMap } from "../../theta-index/constants";
import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap, chains, chainsMap } from "../../wallet/constants";
import { basicVaultFetcher } from "../../basic-vault/helpers";
import { basicVaults } from "../../basic/constants";
import { VaultType } from "../../basic-vault/types";

import {
  normalizeVaultValue,
  getTotalPercentageYields,
  getTotalValueLocked,
  getTotalRemainder,
  getTotalRiskLevel,
} from "./utils";
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
  const basicVaultsAddressesPromises: Promise<string>[] = Array.from(
    { length: vaultsLength },
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (element, index) => indexVaultContract.vaultAddress(index)
  );

  const [assetSymbol, assetDecimals, ...basicVaultsAddresses] =
    await Promise.all([
      assetTokenContract.symbol(),
      assetTokenContract.decimals(),
      ...basicVaultsAddressesPromises,
    ] as const);

  const basicVaultsConfigs = basicVaultsAddresses.map((basicVaultAddress) => {
    const basicVaultConfig = basicVaults.find(
      ({ source }) => basicVaultAddress === source.basicVaultAddress
    );

    const basicVaultId = basicVaultConfig?.id ?? basicVaultAddress;

    return {
      basicVaultId,
      basicVaultAddress,
    };
  });

  // getting type
  const indexVaultType = name.split(" ").at(-1) ?? "";
  const type = indexVaultType === "CALL" ? VaultType.CALL : VaultType.PUT;

  // creating basicVaultsInfosDataPromises
  const basicVaultsInfosDataPromises = basicVaultsConfigs.map(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    ({ basicVaultAddress }) => indexVaultContract.vaults(basicVaultAddress)
  );

  // getting basicVaultsInfosData
  const basicVaultsInfosData = await Promise.all(basicVaultsInfosDataPromises);

  // getting vaults
  const vaults = await Promise.all(
    basicVaultsConfigs.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      ({ basicVaultId, basicVaultAddress }) =>
        queryClient.fetchQuery(
          [QueryType.basicVault, basicVaultId, chainId],

          async () =>
            await basicVaultFetcher(basicVaultId, basicVaultAddress, provider)
        )
    )
  );

  const vaultsInfos: BasicVaultInfo[] = basicVaultsInfosData.map(
    (vaultInfo) => {
      const assetDivisor = new Big(10).pow(assetDecimals);
      const lpAmount = convertToBig(vaultInfo.amount).div(assetDivisor);
      const weight = convertToBig(vaultInfo.weight);

      const allocation = weight.div(totalWeight).mul(100).round(6).toNumber();

      return {
        lpAmount,
        weight,
        allocation,
      };
    }
  );

  // getting assetPrice, oracleIndexPrice and middleIndexPriceByChainId

  const indexVaultConfig = indexVaultsMap[id];

  const { replications = [] } = indexVaultConfig ?? {};

  const indexTokensConfigs = [
    { chainId, assetTokenAddress, indexTokenAddress },
  ].concat(replications);

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

  const middleIndexPrices = await Promise.all(
    indexTokensConfigs.map(async (indexTokensConfig) => {
      const indexTokenRouterAddress =
        chainsMap[indexTokensConfig.chainId].addresses.routerAddress;
      const indexTokenProvider = chainProvidersMap[indexTokensConfig.chainId];

      return await queryClient.fetchQuery(
        [
          QueryType.middleIndexPrice,
          assetPrice,
          indexTokensConfig.assetTokenAddress,
          indexTokensConfig.indexTokenAddress,
          indexTokenRouterAddress,
        ],
        async () =>
          await middleIndexPriceFetcher(
            assetPrice,
            indexTokensConfig.assetTokenAddress,
            indexTokensConfig.indexTokenAddress,
            indexTokenRouterAddress,
            indexTokenProvider
          )
      );
    })
  );

  const middleIndexPriceByChainId = Object.fromEntries(
    indexTokensConfigs.map((indexTokenConfig, index) => [
      indexTokenConfig.chainId,
      middleIndexPrices[index],
    ])
  );

  const totalValueLocked = getTotalValueLocked(vaults, vaultsInfos, assetPrice);

  const totalPercentageYields = getTotalPercentageYields(
    vaults,
    vaultsInfos,
    totalWeight
  );

  const totalRemainder = getTotalRemainder(vaults);

  const totalRiskLevel = getTotalRiskLevel(vaults);

  const supportedChainIds = indexTokensConfigs
    .map((indexTokensConfig) => indexTokensConfig.chainId)
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
    middleIndexPriceByChainId,
    indexTokenAddress,
    vaults,
    vaultsInfos,
    totalWeight,
    totalValueLocked,
    totalRemainder,
    totalPercentageYields,
    totalRiskLevel,
    chainId,
    supportedChainIds,
  };
};
