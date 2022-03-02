/* eslint-disable new-cap */

import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { convertToBig } from "../../vault/helpers";
import { VaultType } from "../../vault/constants";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  IndexVaultAbi__factory as IndexVaultAbiFactory,
  LendingPoolAbi__factory as LendingPoolAbiFactory,
} from "../../contracts/types";
import type { IndexVault, VaultInfo } from "../types";
import { queryClient } from "../../shared/helpers";
import { indexVaults } from "../../theta-index/constants";
import { tokenFetcher } from "../../index-vault-modal/helpers";
import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap, chainsMap } from "../../wallet/constants";

import { vaultFetcher } from "./vaultFetcher";
import { getTotalAnnualPercentageYield, getTotalValueLocked } from "./utils";

export const indexVaultFetcher = async (
  id: string,
  indexVaultAddress: string,
  lendingPoolAddress: string,
  provider: Provider,
  account: string
): Promise<IndexVault> => {
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

  const [assetSymbol, assetDecimals, ...vaultsAddresses]: [
    string,
    number,
    ...string[]
  ] = await Promise.all([
    assetTokenContract.symbol(),
    assetTokenContract.decimals(),
    ...vaultsAddressesPromises,
  ]);

  // getting type
  const indexVaultType = name.split(" ").at(-1) ?? "";
  const type = indexVaultType === "CALL" ? VaultType.CALL : VaultType.PUT;

  // getting vaultsInfosData
  const vaultsInfosData = await Promise.all(
    vaultsAddresses.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (vaultAddress) => indexVaultContract.vaults(vaultAddress)
    )
  );

  // getting vaultsData
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

  const tokenConfig = indexVaults.find(
    ({ source: { indexVaultAddress: sourceIndexVaultAddress } }) =>
      sourceIndexVaultAddress === indexVaultAddress
  );
  const { replications = [] } = tokenConfig ?? {};

  const indexTokensConfigs = [{ chainId, indexTokenAddress }].concat(
    replications.map((replication) => ({
      chainId: replication.chainId,
      indexTokenAddress: replication.indexTokenAddress,
    }))
  );

  const indexTokens = await Promise.all(
    indexTokensConfigs.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (indexTokenConfig) => {
        const replicatedProvider = chainProvidersMap[indexTokenConfig.chainId];
        const replicatedRouterAddress =
          chainsMap[indexTokenConfig.chainId].addresses.routerAddress;

        const queryKey = [
          indexTokenConfig.indexTokenAddress,
          replicatedRouterAddress,
          account,
        ];

        return queryClient.fetchQuery(
          queryKey,
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          () =>
            tokenFetcher(
              indexTokenConfig.indexTokenAddress,
              replicatedRouterAddress,
              replicatedProvider,
              account
            )
        );
      }
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

  const totalValueLocked = getTotalValueLocked(vaults, vaultsInfos);

  const totalAnnualPercentageYield = getTotalAnnualPercentageYield(
    vaults,
    vaultsInfos,
    totalWeight
  );

  const supportedChainIds = [chainId].concat(
    replications.map((replication) => replication.chainId)
  );

  return {
    id,
    type,
    assetSymbol,
    assetTokenAddress,
    indexTokenAddress,
    vaults,
    vaultsInfos,
    totalWeight,
    totalValueLocked,
    totalAnnualPercentageYield,
    chainId,
    supportedChainIds,
    indexTokens,
  };
};
