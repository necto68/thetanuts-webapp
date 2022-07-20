import Big from "big.js";
import type { JsonRpcProvider } from "@ethersproject/providers";

import { DirectWithdrawAbi__factory as DirectWithdrawAbiFactory } from "../../contracts/types";
import {
  convertToBig,
  utcDateFormatter,
  utcTimeFormatter,
} from "../../shared/helpers";
import { DirectWithdraw } from "../../contracts/types/DirectWithdrawAbi";
import type { Token } from "../types";
import type { Vault } from "../../index-vault/types";

import ClaimInfoStructOutput = DirectWithdraw.ClaimInfoStructOutput;

interface VaultWithdrawInfoDto {
  pendingWithdraw?: string;
  claimableBalance?: string;
  formattedLastVaultExpiry?: string;
  signerAddress?: string;
  expectedSum?: string;
  indexTokenWithdrawn?: string;
  totalClaimed?: string;
  rates?: Big[];
  fullyClaimed?: boolean;
  vaultsClaimed?: Record<string, string | undefined>;
  vaultsExpected?: Record<string, string | undefined>;
  vaultsPending?: Record<string, boolean | undefined>;
  vaultsClaimable?: Record<string, string | undefined>;
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

export const getLastWithdrawExpiry = (
  withdrawals: ClaimInfoStructOutput[]
): string => {
  const expiry =
    withdrawals.reduce(
      (previousValue: number, currentValue: ClaimInfoStructOutput) =>
        currentValue.lastVaultExpiry.gt(previousValue)
          ? currentValue.lastVaultExpiry.toNumber()
          : previousValue,
      0
    ) * 1e3;

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

// eslint-disable-next-line complexity
export const withdrawalDataFetcher = async (
  provider: JsonRpcProvider,
  account: string,
  sourceTokenData: Token | undefined,
  targetTokenData: Token | undefined,
  vaults: Vault[],
  directWithdrawalAddress: string,
  sourceValue?: string
): Promise<VaultWithdrawInfoDto> => {
  // Define operation result.
  const result: VaultWithdrawInfoDto = {};

  try {
    // Set last value expiry.
    result.formattedLastVaultExpiry = getLastVaultExpiry(vaults);

    // Set signer address to result.
    result.signerAddress = account;

    // Prepare target token divisor to display user friendly amount.
    const { tokenDivisor } = sourceTokenData ?? {};

    // Define direct withdraw contract.
    const directWithdrawContract = DirectWithdrawAbiFactory.connect(
      directWithdrawalAddress,
      provider
    );

    // Define direct withdrawals array.
    let directWithdrawals = null;

    // If provided sourceValue to calculate on static call.
    if (sourceValue && tokenDivisor && sourceTokenData?.tokenAddress) {
      directWithdrawals = [
        await directWithdrawContract.callStatic.withdraw(
          sourceTokenData.tokenAddress,
          tokenDivisor.mul(sourceValue).toString(),
          { from: account }
        ),
      ];
    }

    if (!directWithdrawals) {
      // Start processing historical data.
      let withdrawCount = 0;

      try {
        withdrawCount = (
          await directWithdrawContract.getUserWithdrawsLength(account)
        ).toNumber();
      } catch {
        return result;
      }

      // In no withdraws yet break.
      if (!withdrawCount) {
        return result;
      }

      // Retrieve user withdraws.
      const allDirectWithdrawals = await Promise.all(
        Array.from(
          { length: withdrawCount },
          async (unused, index: number) =>
            await directWithdrawContract.getUserWithdrawsById(account, index)
        )
      );

      // Retrieve unclaimed withdraws.
      directWithdrawals = allDirectWithdrawals.filter(
        ({ withdrawn }) =>
          !withdrawn.reduce(
            (previous, current) => previous && current.gt(0),
            true
          )
      );

      // If no unclaimed withdraws, calculate for a last one.
      if (directWithdrawals.length === 0 && allDirectWithdrawals.length > 0) {
        directWithdrawals = [
          allDirectWithdrawals[allDirectWithdrawals.length - 1],
        ];
      }
    }

    // Set last value expiry from withdrawals.
    result.formattedLastVaultExpiry = getLastWithdrawExpiry(directWithdrawals);

    // Prepare target token divisor to display user friendly amount.
    const { tokenDivisor: targetTokenDivisor } = targetTokenData ?? {};

    if (tokenDivisor && targetTokenDivisor) {
      // Define claimed vaults value.
      result.vaultsClaimed = getDataByVaults(
        directWithdrawals,
        "withdrawn",
        targetTokenDivisor
      );

      // Define expected vaults value.
      result.vaultsExpected = getDataByVaults(
        directWithdrawals,
        "expected",
        targetTokenDivisor
      );

      // Define pending vaults.
      result.vaultsPending = directWithdrawals.reduce(
        (previousA: Record<string, boolean>, dw) => {
          const pendingVaults = dw.subVault.reduce(
            (previousB: Record<string, boolean>, key, index) => {
              if (typeof previousB[key] !== "boolean") {
                previousB[key] = true;
              }

              previousB[key] = previousB[key] && dw.withdrawn[index].eq(0);

              return previousB;
            },
            {}
          );

          return Object.keys(pendingVaults).reduce(
            (previousC: Record<string, boolean>, key) => {
              if (previousC[key]) {
                return previousC;
              }

              previousC[key] = pendingVaults[key];

              return previousC;
            },
            previousA
          );
        },
        {}
      );

      // Calculate expected to be withdrawn sum by iterating through vaults and summarizing values.
      const expectedSum = directWithdrawals
        .map(({ expected }) =>
          expected.reduce((previousValue, currentValue) =>
            previousValue.add(currentValue)
          )
        )
        .reduce(
          (previousValue, currentValue) =>
            previousValue.add(convertToBig(currentValue)),
          new Big(0)
        );

      // Calculate total spent index token amount.
      const indexTokenWithdrawnSum = directWithdrawals.reduce(
        (previousValue, { indexTokenWithdrawn }) =>
          previousValue.add(convertToBig(indexTokenWithdrawn)),
        new Big(0)
      );

      // Calculate already withdrawn sum by iterating through vaults and summarizing values.
      const withdrawnSum = directWithdrawals
        .map(({ withdrawn }) =>
          withdrawn.reduce((previousValue, currentValue) =>
            previousValue.add(currentValue)
          )
        )
        .reduce(
          (previousValue, currentValue) =>
            previousValue.add(convertToBig(currentValue)),
          new Big(0)
        );

      // Define total claimed.
      result.totalClaimed = withdrawnSum.div(targetTokenDivisor).toFixed(2);

      // Prepare pending withdraw value by excluding withdrawn from pending withdrawn and prepare in to display dividing token divisor.
      result.pendingWithdraw = expectedSum
        .minus(withdrawnSum)
        .div(targetTokenDivisor)
        .toFixed(2);

      // Expected index token withdraw.
      result.expectedSum = expectedSum.div(targetTokenDivisor).toFixed(2);

      // Expected index token withdraw.
      result.indexTokenWithdrawn = indexTokenWithdrawnSum
        .div(tokenDivisor)
        .toFixed(2);

      // Define withdraw rates.
      result.rates = [
        expectedSum.div(indexTokenWithdrawnSum),
        indexTokenWithdrawnSum.div(expectedSum),
      ];

      // If calculate based on source value no needed to calculate rest.
      if (sourceValue) {
        return result;
      }

      // Iterate through vaults and perform static call to get balance that ready to claim.
      const claimableBalances = await Promise.all(
        vaults.map(
          async ({ vaultAddress }) =>
            await directWithdrawContract.callStatic.redeemVault(vaultAddress)
        )
      );

      result.vaultsClaimable = Object.fromEntries(
        claimableBalances.map((claimable, index) => [
          vaults[index].vaultAddress,
          claimable.gt(0)
            ? convertToBig(claimable).div(targetTokenDivisor).toFixed(2)
            : undefined,
        ])
      );

      // Define is fully claimed.
      result.fullyClaimed = Boolean(
        Object.entries(result.vaultsClaimed).reduce(
          (previous, [, current]) =>
            Boolean(current) &&
            !result.vaultsClaimable?.[current ?? ""] &&
            previous,
          true
        )
      );

      const claimableBalance = claimableBalances.reduce(
        (previousValue, currentValue) => previousValue.add(currentValue)
      );

      // Prepare claimable balance by dividing it by token divisor and set it to result.
      result.claimableBalance = convertToBig(claimableBalance)
        .div(targetTokenDivisor)
        .toFixed(2);
    }

    // Returning result.
    return result;
  } catch {
    return result;
  }
};
