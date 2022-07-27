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

const columns: Column<HistoryTransactionRow>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
    render: ({ assetSymbol }) => <AssetCell assetSymbol={assetSymbol} />,
    filterBy: true,
  },
  {
    key: "vaultType",
    title: "Product",
    showTitleInCell: true,
    render: ({ vaultType }) => productTitlesMap[vaultType],
    filterBy: true,
  },
  {
    key: "type",
    title: "Activity",

    render: ({ type, assetSymbol, symbol }) => (
      <CellValueContainer>
        <GreenCellValue>{TransactionTypeTitle[type]}</GreenCellValue>
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
    key: "timestamp",
    title: "Date",

    render: ({ timestamp }) => (
      <GreenCellValue>
        {dateFormatter.format(new Date(timestamp))}
      </GreenCellValue>
    ),
  },
  {
    key: "balance",
    title: "Balance",
    showTitleInCell: true,

    render: ({ balance, assetSymbol, type }) => {
      if (type === TransactionType.canceledWithdrawal) {
        return TransactionTypeTitle[type];
      }

      const formattedBalance = numberFormatter.format(balance.toNumber());

      let prefix = "";

      if (
        [
          TransactionType.withdrawnDirectly,
          TransactionType.initiatedWithdrawal,
        ].includes(type)
      ) {
        prefix = "Requested ";
      } else if (balance.gt(0)) {
        prefix = "+";
      } else {
        prefix = "";
      }

      return `${prefix}${formattedBalance} ${assetSymbol}`;
    },

    sortBy: ({ balance }) => balance.toNumber(),
  },
  {
    key: "chainId",
    title: "Network",
    render: ({ chainId }) => <Chains chainIds={[chainId]} />,
    filterBy: ({ chainId }) => chainsMap[chainId].title,
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
    return <CellValue>You don&apos;t have transaction history, yet</CellValue>;
  }

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset, vault, activity or network"
      getRowKey={getRowKey}
      rows={sortedRows}
    />
  );
};
