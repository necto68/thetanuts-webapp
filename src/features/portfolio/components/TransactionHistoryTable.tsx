import type { Column } from "../../table/types";
import {
  APYCellValue,
  AssetCell,
  CellValue,
  Chains,
  Table,
} from "../../table/components";
import type { HistoryTransactionRow } from "../types";
import { TransactionTypeTitle } from "../types";
import { dateFormatter, numberFormatter } from "../../shared/helpers";
import { ExternalLinkButton } from "../../shared/components";
import { PathType } from "../../wallet/types";
import {
  useIndexPairsHistoryRows,
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
    key: "vaultType",
    title: "Vault",
    showTitleInCell: true,
    render: () => "Theta-Index",
    filterBy: true,
  },
  {
    key: "type",
    title: "Activity",

    render: ({ type }) => (
      <APYCellValue>{TransactionTypeTitle[type]}</APYCellValue>
    ),

    filterBy: ({ type }) => TransactionTypeTitle[type],
  },
  {
    key: "timestamp",
    title: "Date",

    render: ({ timestamp }) => dateFormatter.format(new Date(timestamp)),
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
    title: "Chain",
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
  const indexPairsHistoryRows = useIndexPairsHistoryRows();
  const indexDepositsHistoryRows = useIndexDepositsHistoryRows();

  const sortedRows = indexPairsHistoryRows
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
      filterInputPlaceholder="Filter by asset, vault, activity or chain"
      getRowKey={getRowKey}
      rows={sortedRows}
    />
  );
};
