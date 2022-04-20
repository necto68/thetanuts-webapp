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
} from "../hooks";
import { chainsMap } from "../../wallet/constants";

const columns: Column<HistoryTransactionRow>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
    render: ({ assetSymbol }) => <AssetCell assetSymbol={assetSymbol} />,
    filterBy: true,
  },
  {
    key: "productType",
    title: "Product",
    showTitleInCell: true,
    render: () => "Stronghold",
    filterBy: true,
  },
  {
    key: "type",
    title: "Activity",

    render: ({ type, assetSymbol, symbol }) =>
      type === TransactionType.depositedDirectly ? (
        <GreenCellValue>{TransactionTypeTitle[type]}</GreenCellValue>
      ) : (
        <CellValueContainer>
          <GreenCellValue>{TransactionTypeTitle[type]}</GreenCellValue>
          <GreenCellSubValue>
            {type === TransactionType.swappedIn
              ? `${assetSymbol} to ${symbol}`
              : `${symbol} to ${assetSymbol}`}
          </GreenCellSubValue>
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

    render: ({ balance, assetSymbol }) => {
      const prefix = balance.gt(0) ? "+" : "";
      const formattedBalance = numberFormatter.format(balance.toNumber());

      return `${prefix}${formattedBalance} ${assetSymbol}`;
    },

    sortBy: ({ balance }) => balance.toNumber(),
  },
  {
    key: "chainId",
    title: "Network",
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
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

const getRowKey = ({ id, chainId }: HistoryTransactionRow) => `${id}${chainId}`;

export const TransactionHistoryTable = () => {
  const indexSwapsHistoryRows = useIndexSwapsHistoryRows();
  const indexDepositsHistoryRows = useIndexDepositsHistoryRows();

  const sortedRows = indexSwapsHistoryRows
    .concat(indexDepositsHistoryRows)
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
