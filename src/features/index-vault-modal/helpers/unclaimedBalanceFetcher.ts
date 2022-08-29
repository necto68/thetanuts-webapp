import type { JsonRpcProvider } from "@ethersproject/providers";

import { DirectWithdrawAbi__factory as DirectWithdrawAbiFactory } from "../../contracts/types";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";

export const unclaimedBalanceFetcher = async (
  chainId: ChainId,
  account: string,
  provider: JsonRpcProvider
): Promise<[Record<string, boolean>, number] | undefined> => {
  const { directWithdrawalAddress } = chainsMap[chainId].addresses;

  const directWithdrawContract = DirectWithdrawAbiFactory.connect(
    directWithdrawalAddress,
    provider
  );

  // Get withdraws count from direct withdraw contract.
  const withdrawCount = (
    await directWithdrawContract.getUserWithdrawsLength(account)
  ).toNumber();

  // In no withdraws yet break.
  if (!withdrawCount) {
    return undefined;
  }

  // Retrieve user withdraws.
  const directWithdrawals = await Promise.all(
    Array.from(
      { length: withdrawCount },
      async (unused, index: number) =>
        await directWithdrawContract.getUserWithdrawsById(account, index)
    )
  );

  // Return result.
  return [
    directWithdrawals.reduce(
      (previousValue: Record<string, boolean>, currentValue) => {
        const hasUnclaimed = currentValue.withdrawn.reduce(
          (previous, currentBig) => (!previous ? currentBig.eq(0) : previous),
          false
        );

        if (!previousValue[currentValue.srcVault]) {
          previousValue[currentValue.srcVault] = hasUnclaimed;
        }

        return previousValue;
      },
      {}
    ),
    withdrawCount - 1,
  ];
};
