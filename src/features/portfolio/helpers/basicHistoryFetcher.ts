/* eslint-disable new-cap */
import type { Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import Big from "big.js";

import {
  BasicVaultAbi__factory as BasicVaultAbiFactory,
  BasicVaultDepositorAbi__factory as BasicVaultDepositorAbiFactory,
} from "../../contracts/types";
import { convertToBig, queryClient } from "../../shared/helpers";
import type { Transaction } from "../types";
import { TransactionType } from "../types";
import { QueryType } from "../../shared/types";
import type {
  DepositEvent,
  QueueWithdrawEvent,
  WithdrawEvent,
} from "../../contracts/types/BasicVaultAbi";
import type {
  DepositEvent as QueueDepositEvent,
  CancelDepositEvent as CancelQueueDepositEvent,
} from "../../contracts/types/BasicVaultDepositorAbi";
import { basicVaultFetcher } from "../../basic-vault/helpers";
import type { BasicVaultType } from "../../basic/types";
import { chainsMap } from "../../wallet/constants";
import type { ChainId } from "../../wallet/constants/chains";

import { fetchChainExplorerData } from "./fetchChainExplorerData";

export const basicHistoryFetcher = async (
  basicVaultId: string,
  basicVaultType: BasicVaultType,
  basicVaultAddress: string,
  provider: Provider,
  account: string
): Promise<Transaction[]> => {
  if (!account) {
    return [];
  }

  const { chainId } = (await provider.getNetwork()) as { chainId: ChainId };
  const { basicVaultDepositorAddress } = chainsMap[chainId].addresses;

  const basicVault = await queryClient.fetchQuery(
    [QueryType.basicVault, basicVaultId, basicVaultType, chainId],

    async () =>
      await basicVaultFetcher(
        basicVaultId,
        basicVaultType,
        basicVaultAddress,
        provider
      )
  );

  const collateralTokenDivisor = new Big(10).pow(basicVault.collateralDecimals);

  const basicVaultContract = BasicVaultAbiFactory.connect(
    basicVaultAddress,
    provider
  );

  const basicVaultDepositorContract = BasicVaultDepositorAbiFactory.connect(
    basicVaultDepositorAddress,
    provider
  );

  const basicVaultInterface = BasicVaultAbiFactory.createInterface();
  const basicVaultDepositorInterface =
    BasicVaultDepositorAbiFactory.createInterface();

  const filters = [
    basicVaultDepositorContract.filters.Deposit(
      account,
      basicVaultAddress,
      null
    ),
    basicVaultDepositorContract.filters.CancelDeposit(
      account,
      basicVaultAddress,
      null
    ),
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

  // return empty array if no transactions
  if (
    filtersPromisesValues.every(
      (value) => !value?.result || value.result.length === 0
    )
  ) {
    return [];
  }

  // map results to different data types
  const [
    queueDepositData,
    cancelQueueDepositData,
    depositData,
    queueWithdrawData,
    withdrawData,
  ] = filtersPromisesValues.map((responseData) =>
    responseData ? responseData.result : []
  );

  // parse queue deposit transactions
  const parsedQueueDepositTransactions = queueDepositData.map(
    ({ data, topics }) =>
      basicVaultDepositorInterface.decodeEventLog(
        basicVaultDepositorInterface.getEvent("Deposit"),
        data,
        topics
      ) as unknown as QueueDepositEvent["args"]
  );

  // parse cancel queue deposit transactions
  const parsedCancelQueueDepositTransactions = cancelQueueDepositData.map(
    ({ data, topics }) =>
      basicVaultDepositorInterface.decodeEventLog(
        basicVaultDepositorInterface.getEvent("CancelDeposit"),
        data,
        topics
      ) as unknown as CancelQueueDepositEvent["args"]
  );

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
  const parsedQueueDepositTransactionsTypes = Array.from(
    { length: parsedQueueDepositTransactions.length },
    () => TransactionType.deposited
  );

  const parsedCancelQueueDepositTransactionsTypes = Array.from(
    { length: parsedCancelQueueDepositTransactions.length },
    () => TransactionType.canceledDeposit
  );

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

  // concat arrays with result data
  const basicVaultResultData = depositData.concat(
    queueWithdrawData,
    withdrawData
  );

  const basicVaultDepositorResultData = queueDepositData.concat(
    cancelQueueDepositData
  );

  // concat arrays with transaction types
  const basicVaultParsedTransactionsTypes =
    parsedDepositTransactionsTypes.concat(
      parsedQueueWithdrawTransactionsTypes,
      parsedWithdrawTransactionsTypes
    );

  const basicVaultDepositorParsedTransactionsTypes =
    parsedQueueDepositTransactionsTypes.concat(
      parsedCancelQueueDepositTransactionsTypes
    );

  // concat arrays with transactions
  const basicVaultParsedTransactions = parsedDepositTransactions.concat(
    parsedQueueWithdrawTransactions,
    parsedWithdrawTransactions
  );

  const basicVaultDepositorParsedTransactions = [
    ...parsedQueueDepositTransactions,
    ...parsedCancelQueueDepositTransactions,
  ];

  const basicVaultTransactions = await Promise.all(
    basicVaultParsedTransactions.map(async (transaction, index) => {
      const { transactionHash: id, timeStamp } = basicVaultResultData[index];
      const { _amt: amount, _epoch: transactionEpoch } = transaction;

      let type = basicVaultParsedTransactionsTypes[index];

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

  const basicVaultDepositorTransactions =
    basicVaultDepositorParsedTransactions.map((transaction, index) => {
      const { transactionHash: id, timeStamp } =
        basicVaultDepositorResultData[index];

      const { amt: amount } = transaction;
      const amountBig = convertToBig(amount).div(collateralTokenDivisor);

      const type = basicVaultDepositorParsedTransactionsTypes[index];

      let amountIn = new Big(0);
      let amountOut = new Big(0);

      if (type === TransactionType.deposited) {
        amountIn = amountBig;
      }

      if (type === TransactionType.canceledDeposit) {
        amountOut = amountBig;
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
    });

  return basicVaultTransactions.concat(basicVaultDepositorTransactions);
};
