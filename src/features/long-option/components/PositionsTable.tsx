import { Table } from "../../table/components";
import type { Column } from "../../table/types";
import type { OptionPositionRow } from "../types";

const columns: Column<OptionPositionRow>[] = [
  {
    key: "instrument",
    title: "Instrument",
  },
  {
    key: "side",
    title: "Side",
  },
  {
    key: "size",
    title: "Size",
  },
  {
    key: "IV",
    title: "IV",
  },
  {
    key: "PnL",
    title: "PnL",
  },
];

export const PositionsTable = () => {
  // test data
  const rows: OptionPositionRow[] = [
    {
      instrument: "MATIC-17MAR23-1700-C",
      side: "Long",
      size: 100,
      IV: "106%",
      PnL: 100,
    },
  ];

  return <Table columns={columns} minWidth={0} rows={rows} />;
};
