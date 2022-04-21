import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import { RouterV2Abi__factory as RouterV2AbiFactory } from "../../contracts/types";
import type { SwapEvent } from "../../contracts/types/RouterV2Abi";
import { convertToBig, queryClient } from "../../shared/helpers";
import type { SwapTransaction } from "../types";
import { QueryType } from "../../shared/types";
import { tokenFetcher } from "../../index-vault-modal/helpers";

import { fetchChainExplorerData } from "./fetchChainExplorerData";

export const chainIndexSwapsHistoryFetcher = async (
  routerAddress: string,
  provider: Provider,
  account: string
): Promise<SwapTransaction[]> => {
  const routerContract = RouterV2AbiFactory.connect(routerAddress, provider);
  const routerInterface = RouterV2AbiFactory.createInterface();

  const { chainId } = await provider.getNetwork();

  const { address: filterAddress = "", topics: filterTopics = [] } =
    // eslint-disable-next-line new-cap
    routerContract.filters.Swap(account, null, null, null, null);

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
      routerInterface.decodeEventLog(
        routerInterface.getEvent("Swap"),
        data,
        topics
      ) as unknown as SwapEvent["args"]
  );

  const parsedTransactionsPromises = parsedTransactions.map(
    async (transaction, index) => {
      const { transactionHash: id, timeStamp } = result[index];
      const {
        assetIn,
        assetOut,
        amountIn: amountInBN,
        amountOut: amountOutBN,
      } = transaction;

      const [sourceToken, targetToken] = await Promise.all(
        [assetIn, assetOut].map(
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          (tokenAddress) =>
            queryClient.fetchQuery(
              [QueryType.token, tokenAddress, routerAddress, account],

              // eslint-disable-next-line max-len
              // eslint-disable-next-line @typescript-eslint/promise-function-async
              () => tokenFetcher(tokenAddress, routerAddress, provider, account)
            )
        )
      );

      const amountIn = convertToBig(amountInBN).div(sourceToken.tokenDivisor);
      const amountOut = convertToBig(amountOutBN).div(targetToken.tokenDivisor);

      const timestamp = convertToBig(BigNumber.from(timeStamp))
        .mul(1000)
        .toNumber();

      return {
        id,
        assetIn,
        assetOut,
        amountIn,
        amountOut,
        timestamp,
        chainId,
      };
    }
  );

  return await Promise.all(parsedTransactionsPromises);
};
