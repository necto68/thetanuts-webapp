import type Big from "big.js";

import { useWallet } from "../../wallet/hooks";
import type { Column } from "../../table/types";
import {
  Table,
  Chains,
  AssetCell,
  CellValueContainer,
  CellValue,
  GreenCellValue,
  GreenCellSubValue,
} from "../../table/components";
import type { HistoryTransactionRow } from "../types";
import { TransactionType, TransactionTypeTitle } from "../types";
import { dateFormatter, numberFormatter } from "../../shared/helpers";
import { ExternalLinkButton } from "../../shared/components";
import { PathType } from "../../wallet/types";
import {
  useIndexSwapsHistoryRows,
  useIndexDepositsHistoryRows,
  useIndexWithdrawHistoryRows,
  useIndexRedeemHistoryRows,
  useBasicHistoryRows,
} from "../hooks";
import { chainsMap } from "../../wallet/constants";
import { productTitlesMap } from "../../table/constants";
import { getVaultTitle } from "../../table/helpers";
import { getVaultTypeStrategy } from "../../index-vault/helpers";

const getBalanceChange = (
  type: TransactionType,
  balance: Big,
  symbol: string
) => {
  const formattedBalance = numberFormatter.format(balance.abs().toNumber());

  return `${formattedBalance} ${symbol}`;
};

const columns: Column<HistoryTransactionRow>[] = [
  {
    key: "assetSymbol",
    title: "Product",

    render: ({ vaultType, strategyType, assetSymbol, collateralSymbol }) => (
      <AssetCell
        assetSymbol={assetSymbol}
        collateralSymbol={collateralSymbol}
        type={strategyType}
        vaultType={vaultType}
      />
    ),

    filterBy: ({ assetSymbol, collateralSymbol, vaultType, strategyType }) => [
      assetSymbol,
      collateralSymbol,
      getVaultTitle(vaultType, strategyType, assetSymbol, collateralSymbol),
      getVaultTypeStrategy(strategyType),
    ],
  },
  {
    key: "vaultType",
    title: "Strategy",
    render: ({ vaultType }) => productTitlesMap[vaultType],
    filterBy: true,
  },
  {
    key: "chainId",
    title: "Network",
    render: ({ chainId }) => <Chains chainIds={[chainId]} />,
    filterBy: ({ chainId }) => chainsMap[chainId].title,
  },
  {
    key: "timestamp",
    title: "Date",

    render: ({ timestamp }) => (
      <CellValue>{dateFormatter.format(new Date(timestamp))}</CellValue>
    ),
  },
  {
    key: "type",
    title: "Activity",

    render: ({ type, assetSymbol, symbol, balance }) => (
      <CellValueContainer>
        <GreenCellValue>
          {TransactionTypeTitle[type]}
          {type !== TransactionType.canceledWithdrawal
            ? ` - ${getBalanceChange(
                type,
                balance,
                type === TransactionType.swappedIn ? assetSymbol : symbol
              )}`
            : ""}
        </GreenCellValue>
        {[TransactionType.swappedIn, TransactionType.swappedOut].includes(
          type
        ) ? (
          <GreenCellSubValue>
            {type === TransactionType.swappedIn
              ? `${assetSymbol} to ${symbol}`
              : `${symbol} to ${assetSymbol}`}
          </GreenCellSubValue>
        ) : null}
      </CellValueContainer>
    ),

    filterBy: ({ type }) => type,
  },
  {
    key: "id",
    title: "Tx",

    render: ({ id, chainId }) => (
      <ExternalLinkButton chainId={chainId} id={id} pathType={PathType.tx} />
    ),
  },
];

const getRowKey = ({ id, chainId, type }: HistoryTransactionRow) =>
  `${id}${chainId}${type}`;

export const TransactionHistoryTable = () => {
  const { walletChainId } = useWallet();

  const indexSwapsHistoryRows = useIndexSwapsHistoryRows();
  const indexDepositsHistoryRows = useIndexDepositsHistoryRows();
  const indexWithdrawHistoryRows = useIndexWithdrawHistoryRows();
  const indexRedeemHistoryRows = useIndexRedeemHistoryRows();

  const basicHistoryRows = useBasicHistoryRows();

  const sortedRows = indexSwapsHistoryRows
    .concat(indexDepositsHistoryRows)
    .concat(indexWithdrawHistoryRows)
    .concat(indexRedeemHistoryRows)
    .concat(basicHistoryRows)
    .sort((a, b) => {
      if (b && a) {
        return b.timestamp - a.timestamp;
      }

      return 0;
    });

  if (sortedRows.length === 0) {
    const chainTitle = chainsMap[walletChainId].title;

    return (
      <CellValue>
        {`You don't have transaction history${
          chainTitle ? ` on ${chainTitle} network` : ""
        }, yet`}
      </CellValue>
    );
  }

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Search by Product or Strategy"
      getRowKey={getRowKey}
      rows={sortedRows}
    />
  );
};
