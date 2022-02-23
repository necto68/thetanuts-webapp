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

import { vaultFetcher } from "./vaultFetcher";
import { getTotalAnnualPercentageYield, getTotalValueLocked } from "./utils";

export const indexVaultFetcher = async (
  id: string,
  indexVaultAddress: string,
  lendingPoolAddress: string,
  provider: Provider
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
    { chainId: tokenChainId },
    name,
    totalWeight,
    vaultsLength,
    assetTokenAddress,
    indexTokenAddress,
  ] = await Promise.all([
    provider.getNetwork(),
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
          [vaultAddress, tokenChainId],
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

  const totalValueLocked = getTotalValueLocked(vaults, vaultsInfos);

  const totalAnnualPercentageYield = getTotalAnnualPercentageYield(
    vaults,
    vaultsInfos,
    totalWeight
  );

  const tokenConfig = indexVaults.find(
    ({ source: { indexVaultAddress: sourceIndexVaultAddress } }) =>
      sourceIndexVaultAddress === indexVaultAddress
  );
  const { replications } = tokenConfig ?? {
    replications: [],
  };
  const supportedChainIds = [tokenChainId].concat(
    replications.map(({ chainId }) => chainId)
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
    supportedChainIds,
  };
};
