import { useCallback, useEffect, useState } from "react";
import { sort } from "fast-sort";

interface SortState<RowData> {
  key: keyof RowData | "";
  order?: "ASC" | "DESC";
}

export const useSortBy = <RowData>(
  defaultArray: RowData[],
  getKey: (element: RowData) => string
) => {
  const [sortedArray, setSortedArray] = useState(defaultArray);
  const [sortState, setSortState] = useState<SortState<RowData>>({ key: "" });
  const effectKey = defaultArray.map(getKey).join(",");

  useEffect(() => {
    setSortedArray(defaultArray);
    setSortState({ key: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectKey]);

  const updateSort = useCallback(
    (key: keyof RowData, by?: (element: RowData) => number | string | null) => {
      let nextSortedArray = defaultArray;
      let nextSortState = sortState;

      if (key === sortState.key) {
        if (sortState.order === "ASC") {
          nextSortedArray = sort(defaultArray).by({
            desc: by ?? key,
          });
          nextSortState = {
            key,
            order: "DESC",
          };
        }

        if (sortState.order === "DESC") {
          nextSortedArray = defaultArray;
          nextSortState = {
            key: "",
          };
        }
      } else {
        nextSortedArray = sort(defaultArray).by({
          asc: by ?? key,
        });
        nextSortState = {
          key,
          order: "ASC",
        };
      }

      setSortedArray(nextSortedArray);
      setSortState(nextSortState);
    },
    [defaultArray, sortState]
  );

  return [sortedArray, sortState, updateSort] as const;
};
