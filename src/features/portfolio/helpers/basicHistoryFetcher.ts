/* eslint-disable new-cap */
import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import Big from "big.js";

import { BasicVaultAbi__factory as BasicVaultAbiFactory } from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import type { Transaction } from "../types";
import { TransactionType } from "../types";
import { QueryType } from "../../shared/types";
import type {
  DepositEvent,
  QueueWithdrawEvent,
  WithdrawEvent,
} from "../../contracts/types/BasicVaultAbi";
import { basicVaultFetcher } from "../../basic-vault/helpers";

import { fetchChainExplorerData } from "./fetchChainExplorerData";

export const basicHistoryFetcher = async (
  basicVaultId: string,
  basicVaultAddress: string,
  provider: Provider,
  account: string
): Promise<Transaction[]> => {
  if (!account) {
    return [];
  }

  const { chainId } = await provider.getNetwork();

  const basicVault = await queryClient.fetchQuery(
    [QueryType.basicVault, basicVaultId, chainId],

    async () =>
      await basicVaultFetcher(basicVaultId, basicVaultAddress, provider)
  );

  const collateralTokenDivisor = new Big(10).pow(basicVault.collateralDecimals);

  const basicVaultContract = BasicVaultAbiFactory.connect(
    basicVaultAddress,
    provider
  );

  const basicVaultInterface = BasicVaultAbiFactory.createInterface();

  const filters = [
    basicVaultContract.filters.Deposit(account, null, null, account),
    basicVaultContract.filters.QueueWithdraw(account, null, null, account),
    basicVaultContract.filters.Withdraw(account, null, null, account),
  ];

  const filtersPromisesResults = await Promise.allSettled(
    filters.map(
      async ({ address, topics }) =>
        await fetchChainExplorerData(chainId, address, topics)
    )
  );

  const filtersPromisesValues = filtersPromisesResults.map((promiseResult) =>
    promiseResult.status === "fulfilled" ? promiseResult.value : null
  );

  // map results to different data types
  const [depositData, queueWithdrawData, withdrawData] =
    filtersPromisesValues.map((responseData) =>
      responseData ? responseData.result : []
    );

  const resultsData = depositData.concat(queueWithdrawData, withdrawData);

  // return empty array if no transactions
  if (resultsData.length === 0) {
    return [];
  }

  // parse deposit transactions
  const parsedDepositTransactions = depositData.map(
    ({ data, topics }) =>
      basicVaultInterface.decodeEventLog(
        basicVaultInterface.getEvent("Deposit"),
        data,
        topics
      ) as unknown as DepositEvent["args"]
  );

  // parse queue withdraw transactions
  const parsedQueueWithdrawTransactions = queueWithdrawData.map(
    ({ data, topics }) =>
      basicVaultInterface.decodeEventLog(
        basicVaultInterface.getEvent("QueueWithdraw"),
        data,
        topics
      ) as unknown as QueueWithdrawEvent["args"]
  );

  // parse withdraw transactions
  const parsedWithdrawTransactions = withdrawData.map(
    ({ data, topics }) =>
      basicVaultInterface.decodeEventLog(
        basicVaultInterface.getEvent("Withdraw"),
        data,
        topics
      ) as unknown as WithdrawEvent["args"]
  );

  // create arrays with transaction types
  const parsedDepositTransactionsTypes = Array.from(
    { length: parsedDepositTransactions.length },
    () => TransactionType.deposited
  );

  const parsedQueueWithdrawTransactionsTypes = Array.from(
    { length: parsedQueueWithdrawTransactions.length },
    () => TransactionType.initiatedWithdrawal
  );

  const parsedWithdrawTransactionsTypes = Array.from(
    { length: parsedWithdrawTransactions.length },
    () => TransactionType.claimed
  );

  // concat arrays with transaction types
  const parsedTransactionsTypes = parsedDepositTransactionsTypes.concat(
    parsedQueueWithdrawTransactionsTypes,
    parsedWithdrawTransactionsTypes
  );

  // concat arrays with transactions
  const parsedTransactions = parsedDepositTransactions.concat(
    parsedQueueWithdrawTransactions,
    parsedWithdrawTransactions
  );

  return await Promise.all(
    parsedTransactions.map(async (transaction, index) => {
      const { transactionHash: id, timeStamp } = resultsData[index];
      const { _amt: amount, _epoch: transactionEpoch } = transaction;

      let type = parsedTransactionsTypes[index];

      let amountIn = new Big(0);
      let amountOut = new Big(0);

      if (type === TransactionType.deposited) {
        amountIn = convertToBig(amount).div(collateralTokenDivisor);
      }

      if (type === TransactionType.initiatedWithdrawal) {
        const amountBig = convertToBig(amount);

        // we need to get valuePerLP for transactionEpoch
        // because amount is in LP
        const valuePerLPWei = await basicVaultContract.valuePerLPX1e18(
          transactionEpoch
        );
        const valuePerLP = convertToBig(valuePerLPWei).div(new Big(10).pow(18));

        // convert amount of LP to amount of collateral
        amountOut = amountBig.mul(valuePerLP).div(collateralTokenDivisor);

        // if amountOut === 0 then we just cancelled pending withdrawal
        // and we need to update type to `cancelledWithdrawal`

        type = amountOut.eq(0)
          ? TransactionType.canceledWithdrawal
          : TransactionType.initiatedWithdrawal;
      }

      if (type === TransactionType.claimed) {
        amountOut = convertToBig(amount).div(collateralTokenDivisor);
      }

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
    })
  );
};
