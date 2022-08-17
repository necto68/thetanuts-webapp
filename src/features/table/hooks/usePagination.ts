import { useState } from "react";

import type { TableProps } from "../types";

export const usePagination = <RowData>(
  rows: TableProps<RowData>["rows"],
  rowsPerPage: number
) => {
  const [paginationConfig, setPaginationConfig] = useState({
    page: 1,
    pageSize: rowsPerPage,
  });

  const paginate = (page: number, pageSize: number) => {
    setPaginationConfig({
      page,
      pageSize,
    });
  };

  const paginatedRows = rows.slice(
    paginationConfig.page * paginationConfig.pageSize -
      paginationConfig.pageSize,
    paginationConfig.page * paginationConfig.pageSize
  );

  return { paginatedRows, paginate };
};
