import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import {
  FactoryAbi__factory as FactoryAbiFactory,
  PairAbi__factory as PairAbiFactory,
  RouterV2Abi__factory as RouterV2AbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../vault/helpers";
import type { ChainId } from "../../wallet/constants";
import type { Transaction } from "../types";
import { TransactionType } from "../types";
import type { SwapEvent } from "../../contracts/types/PairAbi";
import { queryClient } from "../../shared/helpers";
import { QueryType } from "../../shared/types";
import { tokenFetcher } from "../../index-vault-modal/helpers";

import { fetchChainExplorerData } from "./fetchChainExplorerData";

export const pairHistoryFetcher = async (
  assetTokenAddress: string,
  indexTokenAddress: string,
  routerAddress: string,
  provider: Provider,
  account: string
): Promise<Transaction[]> => {
  const sortedAddresses = [assetTokenAddress, indexTokenAddress].sort((a, b) =>
    convertToBig(BigNumber.from(a)).cmp(convertToBig(BigNumber.from(b)))
  );

  const routerContract = RouterV2AbiFactory.connect(routerAddress, provider);

  const [{ chainId }, factoryAddress, sourceToken, targetToken] =
    await Promise.all([
      provider.getNetwork() as Promise<{ chainId: ChainId }>,
      routerContract.factory(),
      ...sortedAddresses.map(
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        (tokenAddress) =>
          queryClient.fetchQuery(
            [QueryType.token, tokenAddress, routerAddress, account],
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            () => tokenFetcher(tokenAddress, routerAddress, provider, account)
          )
      ),
    ] as const);

  const factoryContract = FactoryAbiFactory.connect(factoryAddress, provider);

  const pairAddress = await factoryContract.getPair(
    sortedAddresses[0],
    sortedAddresses[1]
  );

  const pairContract = PairAbiFactory.connect(pairAddress, provider);
  const pairInterface = PairAbiFactory.createInterface();

  const { address: filterAddress, topics: filterTopics } =
    // eslint-disable-next-line new-cap
    pairContract.filters.Swap(routerAddress, null, null, null, null, account);

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
      pairInterface.decodeEventLog(
        pairInterface.getEvent("Swap"),
        data,
        topics
      ) as unknown as SwapEvent["args"]
  );

  return parsedTransactions.map((transaction, index) => {
    const { transactionHash: id, timeStamp } = result[index];
    const { amount0In, amount1In, amount0Out, amount1Out } = transaction;

    const [amount0InBig, amount0OutBig] = [amount0In, amount0Out].map(
      (amount) => convertToBig(amount).div(sourceToken.tokenDivisor)
    );

    const [amount1InBig, amount1OutBig] = [amount1In, amount1Out].map(
      (amount) => convertToBig(amount).div(targetToken.tokenDivisor)
    );

    const sourceAddress = amount0InBig.gt(amount1InBig)
      ? sortedAddresses[0]
      : sortedAddresses[1];

    const type =
      sourceAddress === assetTokenAddress
        ? TransactionType.swappedIn
        : TransactionType.swappedOut;

    const amountIn = amount0InBig.gt(amount1InBig)
      ? amount0InBig
      : amount1InBig;

    const amountOut = amount0OutBig.gt(amount1OutBig)
      ? amount0OutBig
      : amount1OutBig;

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
