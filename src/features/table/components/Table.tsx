import { useMemo } from "react";

import {
  ArrowIcon,
  Paginator,
  SkeletonBox,
  Tooltip,
} from "../../shared/components";
import { useSortBy, useFilteredBy, usePagination } from "../hooks";
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
  TooltipContainer,
  TooltipText,
  TableContainer,
  Row,
  Cell,
  CellValue,
  TableContainerWrapper,
  SkeletonWrapper,
} from "./Table.styles";

const renderCellContent = <RowData extends object>(
  row: RowData | undefined,
  column: Column<RowData>
) => {
  if (!row) {
    return (
      <SkeletonWrapper>
        <SkeletonBox height={22} width={50} />
      </SkeletonWrapper>
    );
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
  filterInputPlaceholder,
  rowsPerPage = 7,
  minWidth = 1000,
}: TableProps<RowData>) => {
  const { filteredRows, filterInputValue, setFilterInputValue } = useFilteredBy(
    columns,
    rows
  );

  const { sortedRows, sortState, updateSort } = useSortBy(filteredRows);

  const { paginatedRows, paginate, paginationConfig } = usePagination(
    sortedRows,
    rowsPerPage
  );
  const { page: currentPage } = paginationConfig;

  const isRowsLoaded = useMemo(() => sortedRows.every(Boolean), [sortedRows]);

  return (
    <Container>
      {filterInputPlaceholder ? (
        <FilterInput
          onChange={(event) => {
            paginate(1, rowsPerPage);
            setFilterInputValue(event);
          }}
          placeholder={filterInputPlaceholder}
          value={filterInputValue}
        />
      ) : null}
      <TableContainerWrapper>
        <TableContainer minWidth={minWidth}>
          <thead>
            <HeaderRow>
              {columns.map(
                (
                  {
                    key,
                    title,
                    tooltipTitle,
                    sortBy,
                    minWidth: columnMinWidth,
                  },
                  columnIndex
                ) => (
                  <HeaderCell
                    align={
                      columnIndex === columns.length - 1 ? "right" : undefined
                    }
                    key={title ?? columnIndex.toString()}
                    minWidth={columnMinWidth}
                  >
                    {title ? (
                      <SortButton
                        onClick={() => {
                          paginate(1, rowsPerPage);

                          // @ts-expect-error key type should be fixed
                          updateSort(key, sortBy);
                        }}
                      >
                        <SortContainer>
                          {tooltipTitle ? (
                            <Tooltip
                              content={
                                <TooltipContainer>
                                  <TooltipText>{tooltipTitle}</TooltipText>
                                </TooltipContainer>
                              }
                              id={title}
                              place="top"
                              root={<Header>{title}</Header>}
                            />
                          ) : (
                            <Header>{title}</Header>
                          )}
                          <SortArrowContainer show={sortState.key === key}>
                            <ArrowIcon up={sortState.order === "ASC"} />
                          </SortArrowContainer>
                        </SortContainer>
                      </SortButton>
                    ) : null}
                  </HeaderCell>
                )
              )}
            </HeaderRow>
          </thead>
          <tbody>
            {paginatedRows.map((row, rowIndex) => (
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
      </TableContainerWrapper>
      {isRowsLoaded ? (
        <Paginator
          current={currentPage}
          onChange={paginate}
          pageSize={rowsPerPage}
          showLessItems
          total={sortedRows.length}
        />
      ) : null}
    </Container>
  );
};
