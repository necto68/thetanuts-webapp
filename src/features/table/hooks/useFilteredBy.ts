import { useState } from "react";

import type { TableProps } from "../types";

const isAppropriateRow = <RowData>(
  filterableColumn: TableProps<RowData>["columns"]["0"],
  row: TableProps<RowData>["rows"]["0"],
  filterInputValue: string
): boolean => {
  const { key, render, filterBy } = filterableColumn;

  let rowFilterableValue = "";

  if (!row || !filterBy) {
    return true;
  }

  if (key && filterBy === true) {
    rowFilterableValue = String(row[key]);
  }

  if (!key && render && filterBy === true) {
    rowFilterableValue = String(render(row));
  }

  if (typeof filterBy === "function") {
    const filterableValue = filterBy(row);

    rowFilterableValue = Array.isArray(filterableValue)
      ? filterableValue.join(" ")
      : filterableValue;
  }

  return rowFilterableValue
    .toLowerCase()
    .includes(filterInputValue.toLowerCase());
};

export const useFilteredBy = <RowData>(
  columns: TableProps<RowData>["columns"],
  rows: TableProps<RowData>["rows"]
) => {
  const [filterInputValue, setFilterInputValue] = useState("");

  let filteredRows = rows;

  if (filterInputValue) {
    const filterableColumns = columns.filter((column) => "filterBy" in column);

    filteredRows = rows.filter((row) =>
      filterableColumns.some((filterableColumn) =>
        isAppropriateRow(filterableColumn, row, filterInputValue)
      )
    );
  }

  return { filteredRows, filterInputValue, setFilterInputValue };
};
