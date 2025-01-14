export interface Column<RowData> {
  key?: keyof RowData;
  title?: string;
  tooltipTitle?: string;
  minWidth?: number;
  sortBy?: (row: RowData) => number | string | null;
  filterBy?: true | ((row: RowData) => string[] | string);
  render?: (row: RowData) => JSX.Element | string;
}

export interface TableProps<RowData> {
  columns: Column<RowData>[];
  rows: (RowData | undefined)[];
  getRowKey?: (row: RowData) => string;
  filterInputPlaceholder?: string;
  rowsPerPage?: number;
  minWidth?: number;
}
