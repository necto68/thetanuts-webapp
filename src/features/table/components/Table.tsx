import { ArrowIcon, SkeletonBox } from "../../shared/components";
import { useSortBy } from "../hooks";
import type { Column } from "../types";

import {
  Header,
  HeaderCell,
  HeaderRow,
  SortArrowContainer,
  SortButton,
  SortContainer,
  TableContainer,
  Row,
  Cell,
  CellContentContainer,
  CellValue,
  CellTitle,
} from "./Table.styles";

interface TableProps<RowData> {
  columns: Column<RowData>[];
  rows: (RowData | undefined)[];
  getRowKey?: (row: RowData) => string;
}

const renderCellContent = <RowData extends object>(
  row: RowData | undefined,
  column: Column<RowData>
) => {
  if (!row) {
    return <SkeletonBox height={22} width={50} />;
  }

  const cellTitle = column.title ? (
    <CellTitle>{`${column.title}:`}</CellTitle>
  ) : null;

  let cellValue = null;

  if (column.render) {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const renderedValue = column.render(row);

    cellValue =
      typeof renderedValue === "string" ? (
        <CellValue>{renderedValue}</CellValue>
      ) : (
        renderedValue
      );
  } else if (column.key) {
    cellValue = <CellValue>{row[column.key]}</CellValue>;
  } else {
    cellValue = null;
  }

  return cellTitle ? (
    <CellContentContainer>
      {cellTitle}
      {cellValue}
    </CellContentContainer>
  ) : (
    cellValue
  );
};

export const Table = <RowData extends object>({
  columns,
  rows,
  getRowKey,
}: TableProps<RowData>) => {
  const [sortedRows, sortState, updateSort] = useSortBy(rows);

  return (
    <TableContainer>
      <thead>
        <HeaderRow>
          {columns.map(({ title, key, sortBy }, columnIndex) => (
            <HeaderCell key={title ?? columnIndex.toString()}>
              {title ? (
                <SortButton
                  onClick={() => {
                    // @ts-expect-error key type should be fixed
                    updateSort(key, sortBy);
                  }}
                >
                  <SortContainer>
                    <Header>{title}</Header>
                    <SortArrowContainer show={sortState.key === key}>
                      <ArrowIcon up={sortState.order === "ASC"} />
                    </SortArrowContainer>
                  </SortContainer>
                </SortButton>
              ) : null}
            </HeaderCell>
          ))}
        </HeaderRow>
      </thead>
      <tbody>
        {sortedRows.map((row, rowIndex) => (
          <Row key={row && getRowKey ? getRowKey(row) : rowIndex}>
            {columns.map((column, columnIndex) => (
              <Cell key={column.key?.toString() ?? columnIndex.toString()}>
                {renderCellContent(row, column)}
              </Cell>
            ))}
          </Row>
        ))}
      </tbody>
    </TableContainer>
  );
};
