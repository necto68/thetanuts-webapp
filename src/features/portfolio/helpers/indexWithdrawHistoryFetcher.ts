import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import Big from "big.js";

import { DirectWithdrawAbi__factory as DirectWithdrawAbiFactory } from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import type { ChainId } from "../../wallet/constants";
import type { Transaction } from "../types";
import { TransactionType } from "../types";
import { QueryType } from "../../shared/types";
import { tokenFetcher } from "../../index-vault-modal/helpers";
import type { WithdrawEvent } from "../../contracts/types/DirectWithdrawAbi";

import { fetchChainExplorerData } from "./fetchChainExplorerData";

export const indexWithdrawHistoryFetcher = async (
  assetTokenAddress: string,
  indexTokenAddress: string,
  indexVaultAddress: string,
  directWithdrawalAddress: string,
  provider: Provider,
  account: string
): Promise<Transaction[]> => {
  if (!account) {
    return [];
  }

  const [{ chainId }, assetToken] = await Promise.all([
    provider.getNetwork() as Promise<{ chainId: ChainId }>,
    queryClient.fetchQuery(
      [QueryType.token, assetTokenAddress, directWithdrawalAddress, account],
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      () =>
        tokenFetcher(
          assetTokenAddress,
          directWithdrawalAddress,
          provider,
          account
        )
    ),
  ] as const);

  const directWithdrawContract = DirectWithdrawAbiFactory.connect(
    directWithdrawalAddress,
    provider
  );

  const directWithdrawalInterface = DirectWithdrawAbiFactory.createInterface();

  const { address: filterAddress, topics: filterTopics } =
    // eslint-disable-next-line new-cap
    directWithdrawContract.filters.Withdraw(indexTokenAddress, account);

  let responseData = null;

  try {
    responseData = await fetchChainExplorerData(
      chainId,
      filterAddress,
      filterTopics
    );
  } catch {
    return [];
  }

  const { result } = responseData;

  const directWithdrawals = await Promise.all(
    Array.from(
      { length: result.length },
      async (unused, index: number) =>
        await directWithdrawContract.getUserWithdrawsById(account, index)
    )
  );

  const parsedTransactions = result.map(
    ({ data, topics }) =>
      directWithdrawalInterface.decodeEventLog(
        directWithdrawalInterface.getEvent("Withdraw"),
        data,
        topics
      ) as unknown as WithdrawEvent["args"]
  );

  return parsedTransactions.map((transaction, index) => {
    const { transactionHash: id, timeStamp } = result[index];
    const dw = directWithdrawals[index];

    const expectedSum = convertToBig(
      dw.expected.reduce((previousValue, currentValue) =>
        previousValue.add(currentValue)
      )
    ).div(assetToken.tokenDivisor);

    const amountIn = new Big(0);
    const amountOut = expectedSum;

    const type = TransactionType.withdrawnDirectly;

    const timestamp = convertToBig(BigNumber.from(timeStamp))
      .mul(1000)
      .toNumber();

    return {
      id,
      type,
      amountIn,
      amountOut,
      timestamp,
      chainId,
    };
  });
};
