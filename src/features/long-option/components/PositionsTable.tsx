import { assetFormatter } from "../../shared/helpers";
import { CellValue, Table } from "../../table/components";
import type { Column } from "../../table/types";
import { useLongOptionPositions } from "../hooks";
import type { LongOptionPositionRow } from "../types";

import { ClosePositionButton } from "./ClosePositionButton";
import { ComponentContainer } from "./LongOptionContent.styles";

const columns: Column<LongOptionPositionRow>[] = [
  {
    key: "title",
    title: "Instrument",
  },
  {
    key: "side",
    title: "Side",
  },
  {
    key: "size",
    title: "Size",

    render: ({ size, symbol }) =>
      `${assetFormatter.format(size.toNumber())} ${symbol}`,
  },
  {
    key: "id",
    title: "",

    render: () => <ClosePositionButton />,
  },
];

// eslint-disable-next-line react/no-multi-comp
export const PositionsTable = () => {
  const rows = useLongOptionPositions();

  if (rows.length === 0) {
    return (
      <ComponentContainer>
        <CellValue>You have no open positions</CellValue>
      </ComponentContainer>
    );
  }

  return <Table columns={columns} minWidth={0} rows={rows} />;
};
