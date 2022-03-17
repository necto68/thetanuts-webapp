import type { Column } from "../../table/types";
import {
  Table,
  APYCellValue,
  Chains,
  SwapButton,
  CellValue,
  AssetCell,
} from "../../table/components";
import { indexVaults } from "../../theta-index/constants";
import { useIndexVaults } from "../../index-vault/hooks";
import { VaultType } from "../../vault/constants";
import type { IndexTokenRow } from "../types";
import { useIndexTokensQueries } from "../hooks";
import { currencyFormatter, numberFormatter } from "../../shared/helpers";

const columns: Column<IndexTokenRow>[] = [
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
    key: "type",
    title: "Strategy",
    render: ({ type }) => (type === VaultType.CALL ? "Call" : "Put"),
  },
  {
    key: "annualPercentageYield",
    title: "APY",

    render: ({ annualPercentageYield }) => (
      <APYCellValue>{`${annualPercentageYield}%`}</APYCellValue>
    ),
  },
  {
    key: "balance",
    title: "Balance",

    render: ({ symbol, balance }) =>
      balance ? `${numberFormatter.format(balance.toNumber())}  ${symbol}` : "",

    sortBy: ({ balance }) => (balance ? balance.toNumber() : 0),
  },
  {
    key: "indexPrice",
    title: "Value",

    render: ({ balance, indexPrice }) => {
      if (!balance) {
        return "";
      }

      const price = balance.mul(indexPrice).round(2).toNumber();

      return currencyFormatter.format(price);
    },

    sortBy: ({ balance, indexPrice }) =>
      balance ? balance.mul(indexPrice).toNumber() : 0,
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

export const PositionsTable = () => {
  const indexVaultsIds = indexVaults.map(({ id }) => id);
  const indexVaultsQueries = useIndexVaults(indexVaultsIds);
  const indexTokensQueries = useIndexTokensQueries(indexVaultsIds);

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
        indexPrice,
        totalPercentageYields: { annualPercentageYield },
        supportedChainIds,
      } = data;

      return indexTokens.map(({ symbol, balance, tokenAddress }, index) => ({
        id,
        type,

        // TODO: add more different vault types
        vaultType: "THETA-INDEX",
        assetSymbol,
        indexPrice,
        annualPercentageYield,
        symbol,
        balance,
        tokenAddress,
        chainId: supportedChainIds[index],
      }));
    })
    .filter((row) => (row ? row.balance?.gt(0) : true));

  if (rows.length === 0) {
    return <CellValue>You don&apos;t have any funds, yet</CellValue>;
  }

  return <Table columns={columns} getRowKey={getRowKey} rows={rows} />;
};
