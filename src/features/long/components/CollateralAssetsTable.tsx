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
    key: "collateralTokenSymbol",
    title: "Asset",
    minWidth: 200,

    render: ({ collateralTokenSymbol }) => (
      <AssetCell collateralTokenSymbol={collateralTokenSymbol} />
    ),
  },
  {
    key: "collateralTokenBalance",
    title: "Balance",
    minWidth: 110,

    render: ({ collateralTokenBalance, collateralTokenSymbol }) => {
      const formattedBalance = collateralTokenBalance
        ? numberFormatter.format(collateralTokenBalance.toNumber())
        : "";

      return collateralTokenBalance
        ? `${formattedBalance} ${collateralTokenSymbol}`
        : "-";
    },

    sortBy: ({ collateralTokenBalance }) =>
      collateralTokenBalance ? collateralTokenBalance.toNumber() : 0,
  },
  {
    key: "aTokenBalance",
    title: "Current Position",
    minWidth: 110,

    render: ({ aTokenBalance, collateralPrice }) => (
      <CurrentPositionCell
        aTokenBalance={aTokenBalance}
        collateralPrice={collateralPrice}
      />
    ),

    sortBy: ({ aTokenBalance }) =>
      aTokenBalance ? aTokenBalance.toNumber() : 0,
  },
  {
    key: "id",
    minWidth: 140,

    render: () => "",
  },
];

const getRowKey = ({ id, chainId }: CollateralAsset) => `${id}${chainId}`;

export const CollateralAssetsTable = () => {
  const collateralAssetsIds = collateralAssets.map(({ id }) => id);
  const collateralAssetsQueries = useCollateralAssets(collateralAssetsIds);

  const rows = collateralAssetsQueries.map(({ data }) => data);

  return <Table columns={columns} getRowKey={getRowKey} rows={rows} />;
};
