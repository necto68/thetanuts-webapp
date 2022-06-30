import { useCallback, useState } from "react";
import { sort } from "fast-sort";

interface SortState<RowData> {
  key?: keyof RowData;
  order?: "ASC" | "DESC";
  by?: (element: RowData) => number | string | null;
}

export const useSortBy = <RowData>(rows: RowData[]) => {
  const [sortState, setSortState] = useState<SortState<RowData>>({});
  const {
    key: sortStateKey,
    order: sortStateOrder,
    by: sortStateBy,
  } = sortState;

  const updateSort = useCallback(
    (key: keyof RowData, by?: (element: RowData) => number | string | null) => {
      let nextSortState = sortState;

      if (key === sortStateKey && sortStateOrder === "ASC") {
        nextSortState = {
          key,
          order: "DESC",
          by,
        };
      } else if (key === sortStateKey && sortStateOrder === "DESC") {
        nextSortState = {};
      } else if (key !== sortStateKey) {
        nextSortState = {
          key,
          order: "ASC",
          by,
        };
      } else {
        nextSortState = sortState;
      }

      setSortState(nextSortState);
    },
    [sortState, sortStateKey, sortStateOrder]
  );

  let sortedRows = rows;

  if (sortStateOrder === "ASC" && sortStateKey) {
    sortedRows = sort(rows).by({
      asc: sortStateBy ?? sortStateKey,
    });
  }

  if (sortStateOrder === "DESC" && sortStateKey) {
    sortedRows = sort(rows).by({
      desc: sortStateBy ?? sortStateKey,
    });
  }

  return { sortedRows, sortState, updateSort };
};
