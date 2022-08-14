import { AnimatePresence } from "framer-motion";

import { ArrowIcon, SkeletonBox } from "../../shared/components";
import { useSortBy, useFilteredBy } from "../hooks";
import type { Column, TableProps } from "../types";

import { FilterInput } from "./FilterInput";
import {
  Container,
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
  TableContainerWrapper,
} from "./Table.styles";

const renderCellContent = <RowData extends object>(
  row: RowData | undefined,
  column: Column<RowData>
) => {
  if (!row) {
    return <SkeletonBox height={22} width={50} />;
  }

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

  return cellValue;
};

export const Table = <RowData extends object>({
  columns,
  rows,
  getRowKey,
  filterInputPlaceholder = "",
}: TableProps<RowData>) => {
  const { filteredRows, filterInputValue, setFilterInputValue } = useFilteredBy(
    columns,
    rows
  );
  const { sortedRows, sortState, updateSort } = useSortBy(filteredRows);

  return (
    <Container>
      <FilterInput
        onChange={setFilterInputValue}
        placeholder={filterInputPlaceholder}
        value={filterInputValue}
      />
      <TableContainerWrapper>
        <TableContainer>
          <thead>
            <HeaderRow>
              {columns.map(({ title, key, sortBy, minWidth }, columnIndex) => (
                <HeaderCell
                  align={
                    columnIndex === columns.length - 1 ? "right" : undefined
                  }
                  key={title ?? columnIndex.toString()}
                  minWidth={minWidth?.toString()}
                >
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
            <AnimatePresence initial={false}>
              {sortedRows.map((row, rowIndex) => (
                <Row key={row && getRowKey ? getRowKey(row) : rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <Cell
                      key={column.key?.toString() ?? columnIndex.toString()}
                    >
                      {renderCellContent(row, column)}
                    </Cell>
                  ))}
                </Row>
              ))}
            </AnimatePresence>
          </tbody>
        </TableContainer>
      </TableContainerWrapper>
    </Container>
  );
};
