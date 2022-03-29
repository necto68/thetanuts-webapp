import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import { DirectDepositorAbi__factory as DirectDepositorAbiFactory } from "../../contracts/types";
import { convertToBig } from "../../vault/helpers";
import type { ChainId } from "../../wallet/constants";
import type { Transaction } from "../types";
import { TransactionType } from "../types";
import type { DepositEvent } from "../../contracts/types/DirectDepositorAbi";
import { queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { tokenFetcher } from "../../index-vault-modal/helpers";

import { fetchChainExplorerData } from "./fetchChainExplorerData";

export const indexDepositsHistoryFetcher = async (
  assetTokenAddress: string,
  indexTokenAddress: string,
  indexVaultAddress: string,
  directDepositorAddress: string,
  provider: Provider,
  account: string
): Promise<Transaction[]> => {
  if (!account) {
    return [];
  }

  const tokensAddresses = [assetTokenAddress, indexTokenAddress];

  const [{ chainId }, assetToken, indexToken] = await Promise.all([
    provider.getNetwork() as Promise<{ chainId: ChainId }>,
    ...tokensAddresses.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (tokenAddress) =>
        queryClient.fetchQuery(
          [QueryType.token, tokenAddress, directDepositorAddress, account],
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          () =>
            tokenFetcher(
              tokenAddress,
              directDepositorAddress,
              provider,
              account
            )
        )
    ),
  ] as const);

  const directDepositorContract = DirectDepositorAbiFactory.connect(
    directDepositorAddress,
    provider
  );
  const directDepositorInterface = DirectDepositorAbiFactory.createInterface();

  const { address: filterAddress, topics: filterTopics } =
    // eslint-disable-next-line new-cap
    directDepositorContract.filters.Deposit(
      indexVaultAddress,
      account,
      null,
      null
    );

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
      directDepositorInterface.decodeEventLog(
        directDepositorInterface.getEvent("Deposit"),
        data,
        topics
      ) as unknown as DepositEvent["args"]
  );

  return parsedTransactions.map((transaction, index) => {
    const { transactionHash: id, timeStamp } = result[index];
    const { amtIn, amtOut } = transaction;

    const amountIn = convertToBig(amtIn).div(assetToken.tokenDivisor);
    const amountOut = convertToBig(amtOut).div(indexToken.tokenDivisor);

    const type = TransactionType.depositedDirectly;

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
