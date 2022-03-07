import { ArrowIcon, SkeletonBox } from "../../shared/components";
import { useSortBy } from "../hooks";
import type { Column } from "../types";

import {Tooltip} from '../../shared/components/Tooltip' 

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
  CellValue,
} from "./Table.styles";

interface TableProps<RowData> {
  columns: Column<RowData>[];
  rows: (RowData | undefined)[];
  getRowKey?: (row: RowData) => string;
}

const renderCellValue = <RowData extends object>(
  row: RowData | undefined,
  column: Column<RowData>
) => {
  if (!row) {
    return <SkeletonBox height={22} width={50} />;
  }

  if (column.render) {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const cellValue = column.render(row);

    return typeof cellValue === "string" ? (
      <CellValue>{cellValue}</CellValue>
    ) : (
      cellValue
    );
  }

  if (column.key) {
    return <CellValue>{row[column.key]}</CellValue>;
  }

  return null;
};

export const Table = <RowData extends object>({
  columns,
  rows,
  getRowKey,
}: TableProps<RowData>) => {
  const [sortedRows, sortState, updateSort] = useSortBy(rows);

  return (
    <TableContainer>
      <Tooltip 
          color="white"
          type="table"
          toolTipId="tableToolTip" 
          WPY='0.82'
          MPY='3.61'
          APR='42.8'
          APY='53.1'
      />

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
                {renderCellValue(row, column)}
                
              </Cell>
            ))}
          </Row>
        ))}
      </tbody>
    </TableContainer>
  );
};
