import type Big from "big.js";
import type { Web3Provider } from "@ethersproject/providers";

import { DirectWithdrawAbi__factory as DirectWithdrawAbiFactory } from "../../contracts/types";
import {
  convertToBig,
  utcDateFormatter,
  utcTimeFormatter,
} from "../../shared/helpers";
import { DirectWithdraw } from "../../contracts/types/DirectWithdrawAbi";
import type { NativeToken, Token } from "../types";
import type { Vault } from "../../index-vault/types";

import ClaimInfoStructOutput = DirectWithdraw.ClaimInfoStructOutput;

interface VaultWithdrawInfoDto {
  pendingWithdraw?: string;
  maxProjectedWithdraw?: string;
  claimableBalance?: string;
  formattedLastVaultExpiry?: string;
  signerAddress?: string;
  vaultsClaimed?: Record<string, string | undefined>;
  vaultsExpected?: Record<string, string | undefined>;
}

export const getLastVaultExpiry = (vaults: Vault[]): string => {
  const expiry = vaults.reduce(
    (previousValue: number, currentValue: Vault) =>
      currentValue.expiry > previousValue ? currentValue.expiry : previousValue,
    0
  );

  const formattedExpiryTimeUTC = utcTimeFormatter.format(new Date(expiry));
  const formattedExpiryDateUTC = utcDateFormatter.format(new Date(expiry));

  return expiry
    ? `${formattedExpiryTimeUTC} UTC ${formattedExpiryDateUTC}`
    : "N/A";
};

export const getDataByVaults = (
  directWithdrawals: ClaimInfoStructOutput[],
  property: "expected" | "withdrawn",
  tokenDivisor: Big
): Record<string, string | undefined> => {
  // Group data by vaults addresses.
  const dataByVaults = directWithdrawals
    .map((dw: ClaimInfoStructOutput) =>
      dw.subVault.reduce(
        (
          previousValue: Record<string, Big | undefined>,
          currentValue,
          index
        ) => {
          previousValue[currentValue] = convertToBig(dw[property][index]);
          return previousValue;
        },
        {}
      )
    )
    .reduce((previousValue, currentValue) => {
      for (const vaultAddress in currentValue) {
        if (Object.prototype.hasOwnProperty.call(currentValue, vaultAddress)) {
          previousValue[vaultAddress] = currentValue[vaultAddress]?.add(
            previousValue[vaultAddress] ?? 0
          );
        }
      }
      return previousValue;
    }, {});

  // Prepare user friendly value of claimed or and expected vault value.
  return Object.keys(dataByVaults).reduce(
    (previousValue: Record<string, string | undefined>, currentValue) => {
      const value = dataByVaults[currentValue]?.div(tokenDivisor);
      previousValue[currentValue] = value?.lte(0)
        ? undefined
        : value?.toFixed(2);
      return previousValue;
    },
    {}
  );
};

export const withdrawalDataFetcher = async (
  walletProvider: Web3Provider | undefined,
  sourceTokenData: NativeToken | Token | undefined,
  targetTokenData: NativeToken | Token | undefined,
  exchangeRate: Big,
  vaults: Vault[],
  directWithdrawalAddress: string
): Promise<VaultWithdrawInfoDto> => {
  // Define operation result.
  const result: VaultWithdrawInfoDto = {};

  // In no wallet connected break.
  if (!walletProvider) {
    return result;
  }

  // Max projected withdraw amount equals to balance multiplied by asset price from oracle.
  result.maxProjectedWithdraw = sourceTokenData?.balance
    ?.mul(exchangeRate)
    .toFixed(2);

  // Set last value expiry.
  result.formattedLastVaultExpiry = getLastVaultExpiry(vaults);

  // Get contract signer.
  const signer = walletProvider.getSigner();

  // Get address of signer.
  const signerAddress = await signer.getAddress();

  // Set signer address to result.
  result.signerAddress = signerAddress;

  // Define direct withdraw contract.
  const directWithdrawContract = DirectWithdrawAbiFactory.connect(
    directWithdrawalAddress,
    signer
  );

  // Get withdraws count from direct withdraw contract.
  const withdrawCount = (
    await directWithdrawContract.getUserWithdrawsLength(signerAddress)
  ).toNumber();

  // In no withdraws yet break.
  if (!withdrawCount) {
    return result;
  }

  // Retrieve user withdraws.
  const directWithdrawals = await Promise.all(
    Array.from(
      { length: withdrawCount },
      async (unused, index: number) =>
        await directWithdrawContract.getUserWithdrawsById(signerAddress, index)
    )
  );

  // Prepare target token divisor to display user friendly amount.
  const { tokenDivisor } = targetTokenData ?? {};

  if (tokenDivisor) {
    // Define claimed vaults value.
    result.vaultsClaimed = getDataByVaults(
      directWithdrawals,
      "withdrawn",
      tokenDivisor
    );

    // Define expected vaults value.
    result.vaultsExpected = getDataByVaults(
      directWithdrawals,
      "expected",
      tokenDivisor
    );

    // Calculate expected to be withdrawn sum by iterating through vaults and summarizing values.
    const expectedSum = directWithdrawals
      .map(({ expected }) =>
        expected.reduce((previousValue, currentValue) =>
          previousValue.add(currentValue)
        )
      )
      .reduce((previousValue, currentValue) => previousValue.add(currentValue));

    // Calculate already withdrawn sum by iterating through vaults and summarizing values.
    const withdrawnSum = directWithdrawals
      .map(({ withdrawn }) =>
        withdrawn.reduce((previousValue, currentValue) =>
          previousValue.add(currentValue)
        )
      )
      .reduce((previousValue, currentValue) => previousValue.add(currentValue));

    // Prepare pending withdraw value by excluding withdrawn from pending withdrawn and prepare in to display dividing token divisor.
    result.pendingWithdraw = convertToBig(expectedSum)
      .minus(convertToBig(withdrawnSum))
      .div(tokenDivisor)
      .toFixed(2);

    // Iterate through vaults and perform static call to get balance that ready to claim.
    const claimableBalance = (
      await Promise.all(
        vaults.map(
          async ({ vaultAddress }) =>
            await directWithdrawContract.callStatic.redeemVault(vaultAddress)
        )
      )
    ).reduce((previousValue, currentValue) => previousValue.add(currentValue));

    // Prepare claimable balance by dividing it by token divisor and set it to result.
    result.claimableBalance = convertToBig(claimableBalance)
      .div(tokenDivisor)
      .toFixed(2);
  }

  // Returning result.
  return result;
};
