import type { Column } from "../../table/types";
import {
  Table,
  GreenCellValue,
  Chains,
  SwapButton,
  CellValue,
  AssetCell,
} from "../../table/components";
import type { IndexTokenRow } from "../types";
import { useIndexPositionsRows } from "../hooks";
import { currencyFormatter, numberFormatter } from "../../shared/helpers";
import { chainsMap } from "../../wallet/constants";

const columns: Column<IndexTokenRow>[] = [
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
    key: "annualPercentageYield",
    title: "APY",
    showTitleInCell: true,

    render: ({ annualPercentageYield }) => (
      <GreenCellValue>{`${annualPercentageYield}%`}</GreenCellValue>
    ),
  },
  {
    key: "balance",
    title: "Balance",
    showTitleInCell: true,

    render: ({ symbol, balance }) =>
      balance ? `${numberFormatter.format(balance.toNumber())}  ${symbol}` : "",

    sortBy: ({ balance }) => (balance ? balance.toNumber() : 0),
  },
  {
    key: "indexPrice",
    title: "Value",
    showTitleInCell: true,

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
    title: "Network",

    render: ({ id, chainId }) => (
      <Chains chainIds={[chainId]} indexVaultId={id} />
    ),

    filterBy: ({ chainId }) => chainsMap[chainId].title,
  },
  {
    key: "id",

    render: ({ id, chainId }) => (
      <SwapButton chainId={chainId} indexVaultId={id} />
    ),
  },
];

const getRowKey = ({ tokenAddress, chainId }: IndexTokenRow) =>
  `${tokenAddress}${chainId}`;

export const PositionsTable = () => {
  const indexPositionsRows = useIndexPositionsRows();

  const filteredRows = indexPositionsRows.filter((row) =>
    row ? row.balance?.gt(0) : true
  );

  if (filteredRows.length === 0) {
    return <CellValue>You don&apos;t have any funds, yet</CellValue>;
  }

  return (
    <Table
      columns={columns}
      filterInputPlaceholder="Filter by asset, product or network"
      getRowKey={getRowKey}
      rows={filteredRows}
    />
  );
};
