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
import type { RedeemEvent } from "../../contracts/types/DirectWithdrawAbi";

import { fetchChainExplorerData } from "./fetchChainExplorerData";

export const indexRedeemHistoryFetcher = async (
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
    directWithdrawContract.filters.Redeem(indexTokenAddress, account);

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

  const parsedTransactions = result.map(
    ({ data, topics }) =>
      directWithdrawalInterface.decodeEventLog(
        directWithdrawalInterface.getEvent("Redeem"),
        data,
        topics
      ) as unknown as RedeemEvent["args"]
  );

  return parsedTransactions.map((transaction, index) => {
    const { transactionHash: id, timeStamp } = result[index];
    const { redeemed } = transaction;

    const amountIn = new Big(0);
    const amountOut = convertToBig(redeemed).div(assetToken.tokenDivisor);

    const type = TransactionType.claim;

    const timestamp = convertToBig(BigNumber.from(timeStamp).add(1))
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
