import type { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import Big from "big.js";

import { DirectWithdrawAbi__factory as DirectWithdrawAbiFactory } from "../../contracts/types";
import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";
import { convertToBig } from "../../shared/helpers";

export const unclaimedBalanceFetcher = async (
  chainId: ChainId,
  provider: JsonRpcProvider,
  walletProvider: Web3Provider | undefined
): Promise<Record<string, Big> | undefined> => {
  const { directWithdrawalAddress } = chainsMap[chainId].addresses;

  const signer = walletProvider?.getSigner();
  const signerAddress = (await signer?.getAddress()) ?? "";

  const directWithdrawContract = DirectWithdrawAbiFactory.connect(
    directWithdrawalAddress,
    provider
  );

  // Get withdraws count from direct withdraw contract.
  const withdrawCount = (
    await directWithdrawContract.getUserWithdrawsLength(signerAddress)
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
        await directWithdrawContract.getUserWithdrawsById(signerAddress, index)
    )
  );

  return directWithdrawals.reduce(
    (previousValue: Record<string, Big>, currentValue) => {
      previousValue[currentValue.srcVault] = convertToBig(
        currentValue.withdrawn.reduce((previousBig, currentBig) =>
          previousBig.add(currentBig)
        )
      )
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        .add(previousValue[currentValue.srcVault] ?? new Big(0));

      previousValue[currentValue.srcVault] = convertToBig(
        currentValue.expected.reduce((previousBig, currentBig) =>
          previousBig.add(currentBig)
        )
      )
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        .sub(previousValue[currentValue.srcVault] ?? new Big(0));

      return previousValue;
    },
    {}
  );
};
