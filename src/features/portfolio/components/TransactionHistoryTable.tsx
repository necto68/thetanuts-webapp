import type { Column } from "../../table/types";
import {
  APYCellValue,
  AssetCell,
  CellValue,
  Chains,
  Table,
} from "../../table/components";
import { VaultType } from "../../vault/constants";
import type { HistoryTransactionRow } from "../types";
import { TransactionTypeTitle } from "../types";
import { dateFormatter, numberFormatter } from "../../shared/helpers";
import { ExternalLinkButton } from "../../shared/components";
import { PathType } from "../../wallet/types";
import {
  useIndexPairsHistoryRows,
  useIndexDepositsHistoryRows,
} from "../hooks";

const columns: Column<HistoryTransactionRow>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
    render: ({ assetSymbol }) => <AssetCell assetSymbol={assetSymbol} />,
  },
  {
    key: "vaultType",
    title: "Vault",
    render: () => "Theta-Index",
  },
  {
    key: "indexVaultType",
    title: "Strategy",

    render: ({ indexVaultType }) =>
      indexVaultType === VaultType.CALL ? "Call" : "Put",
  },
  {
    key: "type",
    title: "Activity",

    render: ({ type }) => (
      <APYCellValue>{TransactionTypeTitle[type]}</APYCellValue>
    ),
  },
  {
    key: "timestamp",
    title: "Date",

    render: ({ timestamp }) => dateFormatter.format(new Date(timestamp)),
  },
  {
    key: "balance",
    title: "Balance",

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

  return <Table columns={columns} getRowKey={getRowKey} rows={sortedRows} />;
};
