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

export const indexVaultFetcher = async (
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
    name,
    totalWeight,
    vaultsLength,
    assetTokenAddress,
    indexTokenAddress,
  ] = await Promise.all([
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

  // getting vaultsInfos
  const vaultsInfosData = await Promise.all(
    vaultsAddresses.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (vaultAddress) => indexVaultContract.vaults(vaultAddress)
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

  return {
    type,
    assetSymbol,
    assetTokenAddress,
    indexTokenAddress,
    vaultsAddresses,
    vaultsInfos,
    totalWeight,
  };
};
