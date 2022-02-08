/* eslint-disable new-cap */

import type { Provider } from "@ethersproject/providers";
import Big from "big.js";

import { convertToBig } from "../../vault/helpers";
import { VaultType } from "../../vault/constants";
import {
  Erc20Abi__factory as Erc20AbiFactory,
  IndexVaultAbi__factory as IndexVaultAbiFactory,
} from "../../contracts/types";
import type { IndexVault, VaultInfo } from "../types";

export const indexVaultFetcher = async (
  indexVaultAddress: string,
  provider: Provider
): Promise<IndexVault> => {
  const indexVaultContract = IndexVaultAbiFactory.connect(
    indexVaultAddress,
    provider
  );

  const [name, assetAddress, totalWeight, vaultsLength] = await Promise.all([
    indexVaultContract.name(),
    indexVaultContract.COLLAT(),
    indexVaultContract.totalWeight().then(convertToBig),
    indexVaultContract.vaultsLength().then((bigNumber) => bigNumber.toNumber()),
  ]);

  const assetContract = Erc20AbiFactory.connect(assetAddress, provider);

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
    assetContract.symbol(),
    assetContract.decimals(),
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
    vaultsAddresses,
    vaultsInfos,
    totalWeight,
  };
};
