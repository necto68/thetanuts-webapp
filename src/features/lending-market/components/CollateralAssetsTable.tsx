import { Table } from "../../table/components";
import type { Column } from "../../table/types";
import { collateralAssets } from "../constants";
import { useCollateralAssets } from "../hooks";
import type { CollateralAsset } from "../types";
import { numberFormatter } from "../../shared/helpers";

import { AssetCell } from "./AssetCell";
import { CurrentPositionCell } from "./CurrentPositionCell";

const columns: Column<CollateralAsset>[] = [
  {
    key: "collateralToken",
    title: "Asset",
    minWidth: 200,

    render: ({ collateralToken: { symbol } }) => <AssetCell symbol={symbol} />,
    sortBy: ({ collateralToken: { symbol } }) => symbol,
  },
  {
    key: "collateralToken",
    title: "Balance",
    minWidth: 110,

    render: ({ collateralToken: { symbol, balance } }) =>
      balance
        ? `${numberFormatter.format(balance.toNumber())}  ${symbol}`
        : "-",

    sortBy: ({ collateralToken: { balance } }) =>
      balance ? balance.toNumber() : 0,
  },
  {
    key: "aToken",
    title: "Current Position",
    minWidth: 110,

    render: ({ aToken: { balance }, collateralPrice }) => (
      <CurrentPositionCell
        balance={balance}
        collateralPrice={collateralPrice}
      />
    ),

    sortBy: ({ aToken: { balance } }) => (balance ? balance.toNumber() : 0),
  },
  {
    key: "id",
    minWidth: 140,

    render: () => "",
  },
];

const getRowKey = ({ id, collateralToken: { chainId } }: CollateralAsset) =>
  `${id}${chainId}`;

export const CollateralAssetsTable = () => {
  const collateralAssetsIds = collateralAssets.map(({ id }) => id);
  const collateralAssetsQueries = useCollateralAssets(collateralAssetsIds);

  const rows = collateralAssetsQueries.map(({ data }) => data);

  return <Table columns={columns} getRowKey={getRowKey} rows={rows} />;
};
