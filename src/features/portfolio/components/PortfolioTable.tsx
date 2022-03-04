import { useWallet } from "@gimmixorg/use-wallet";

import type { Column } from "../../table/types";
import {
  Table,
  APYCellValue,
  Chains,
  SwapButton,
  CellValue,
} from "../../table/components";
import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks/useIndexVaults";
import { VaultType } from "../../vault/constants";
import type { IndexTokenRow } from "../types";
import { useIndexTokensQueries } from "../hooks";

const columns: Column<IndexTokenRow>[] = [
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
    key: "type",
    title: "Strategy",
    render: ({ type }) => (type === VaultType.CALL ? "Call" : "Put"),
  },
  {
    key: "totalAnnualPercentageYield",
    title: "Consolidated APY",

    render: ({ totalAnnualPercentageYield }) => (
      <APYCellValue>{`${totalAnnualPercentageYield}%`}</APYCellValue>
    ),
  },
  {
    key: "balance",
    title: "Balance",

    render: ({ symbol, balance }) =>
      balance ? `${balance.round(3).toString()}  ${symbol}` : "",

    sortBy: ({ balance }) => (balance ? balance.toNumber() : 0),
  },
  {
    // TODO: use key: price
    key: "tokenAddress",
    title: "Value",
    render: () => "$9999.99",
  },
  {
    key: "chainId",
    title: "Chain",
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    render: ({ chainId }) => <Chains chainIds={[chainId]} />,
  },
  {
    key: "id",
    render: ({ id }) => <SwapButton indexVaultId={id} />,
  },
];

const getRowKey = ({ tokenAddress, chainId }: IndexTokenRow) =>
  `${tokenAddress}${chainId}`;

export const PortfolioTable = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

  const { account } = useWallet();

  const rows: (IndexTokenRow | undefined)[] = indexVaultsQueries
    .flatMap(({ data }, vaultIndex) => {
      const { data: indexTokens } = indexTokensQueries[vaultIndex];

      if (!data || !indexTokens) {
        return undefined;
      }

      const {
        id,
        type,
        assetSymbol,
        totalAnnualPercentageYield,
        supportedChainIds,
      } = data;

      return indexTokens.map(({ symbol, balance, tokenAddress }, index) => ({
        id,
        type,

        // TODO: add more different vault types
        vaultType: "THETA-INDEX",
        assetSymbol,
        totalAnnualPercentageYield,
        symbol,
        balance,
        tokenAddress,
        chainId: supportedChainIds[index],
      }));
    })
    .filter((row) => (row ? row.balance?.gt(0) : true));

  if (!account) {
    return <CellValue>Please, connect wallet</CellValue>;
  }

  if (rows.length === 0) {
    return <CellValue>You don&apos;t have any funds, yet</CellValue>;
  }

  return <Table columns={columns} getRowKey={getRowKey} rows={rows} />;
};
