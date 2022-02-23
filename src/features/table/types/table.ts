export interface Column<RowData> {
  key?: keyof RowData;
  title?: string;
  sortBy?: (row: RowData) => number | string | null;
  render?: (row: RowData) => JSX.Element | string;
}
