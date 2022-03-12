import type { Column } from "../../table/types";
import { APYCellValue, CellValue, Chains, Table } from "../../table/components";
import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks/useIndexVaults";
import { VaultType } from "../../vault/constants";
import type { HistoryTransactionRow } from "../types";
import { TransactionType } from "../types";
import { useIndexPairsHistoryQueries } from "../hooks";
import { dateFormatter, numberFormatter } from "../../shared/helpers";
import { ExternalLinkButton } from "../../shared/components";
import { PathType } from "../../wallet/types";

const columns: Column<HistoryTransactionRow>[] = [
  {
    key: "assetSymbol",
    title: "Asset",
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
      <APYCellValue>
        {type === TransactionType.swappedIn ? "Swapped In" : "Swapped Out"}
      </APYCellValue>
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
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexPairsHistoryQueries = useIndexPairsHistoryQueries(indexVaultsIds);

  const rows: (HistoryTransactionRow | undefined)[] =
    indexVaultsQueries.flatMap(({ data }, vaultIndex) => {
      const { data: historyTransactions } =
        indexPairsHistoryQueries[vaultIndex];

      if (!data || !historyTransactions) {
        return undefined;
      }

      const { type: indexVaultType, assetSymbol } = data;

      return historyTransactions.map(
        ({ id, type, timestamp, amountIn, amountOut, chainId }) => ({
          id,
          type,
          timestamp,

          balance:
            type === TransactionType.swappedIn ? amountIn.mul(-1) : amountOut,

          chainId,

          // TODO: add more different vault types
          vaultType: "THETA-INDEX",
          indexVaultType,
          assetSymbol,
        })
      );
    });

  const sortedRows = rows
    .map((row) => row)
    .sort((a, b) => {
      if (b && a) {
        return b.timestamp - a.timestamp;
      }

      return 0;
    });

  if (rows.length === 0) {
    return <CellValue>You don&apos;t have transaction history, yet</CellValue>;
  }

  return <Table columns={columns} getRowKey={getRowKey} rows={sortedRows} />;
};
