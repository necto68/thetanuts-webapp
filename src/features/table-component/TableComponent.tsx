
// @ts-nocheck

import { ArrowIcon } from "../shared/components";
import React, { FC } from 'react';

import {
  Container,
  VaultsTable,
  HeaderRow,
  HeaderCell,
  SortContainer,
  SortButton,
  SortArrowContainer,
  Header,
  Row,
  Cell,
  CellValue,
  SwapButton,
  CenteredCell,
} from "./TableComponent.styles";

interface Config {
  [key:string]:string;
  direction:string;
}

interface TableColumn{
  title: string;
  sortKey: string;
}

interface TableRow{
  assetSymbol: string;
  strategy?: string;
  apy?:number;
  tvl?:string
  chains?:string
  vaultType?:string
  balance?:string
  chain?:string
}

interface TableProps{
  columns:TableColumn[],
  rows:TableRow[]
}

const useSortableData = (items:TableRow[], config = null) => {
  const [sortConfig, setSortConfig] = React.useState<Config | null>(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort= (key: string) => {
    let direction = 'ascending';
    if (
      sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};


export const TableComponent:FC<TableProps> = ({ columns, rows}) => {
  
  const { items, requestSort, sortConfig } = useSortableData(rows);

  return (
    <Container>
      <VaultsTable>
        <thead>
          <HeaderRow>
            {columns.map(({ title, sortKey }) => (
              <HeaderCell key={title}>
                <SortButton
                  onClick={() => requestSort(sortKey)}
                >
                  <SortContainer>
                    <Header>{title}</Header>
                    <SortArrowContainer show={sortConfig ? sortKey === sortConfig.key : false }>
                      <ArrowIcon up={sortConfig && sortConfig.direction === 'ascending' ? false : true} />
                    </SortArrowContainer>
                  </SortContainer>
                </SortButton>
              </HeaderCell>
            ))}
          </HeaderRow>
        </thead>
        <tbody>

          {items.map((row) => (
            <Row key={row.assetSymbol}>
              {Object.entries(row).map(([key, value]) => (
                
                <Cell>
                  {key === 'apy' ? <CellValue style={{ color: Number(row.apy) > 0 ? '#92F0A9' : '#E08585' }}>{row.apy} %</CellValue> : <CellValue>{value}</CellValue>}
                </Cell>
              ))}

              <Cell>
                <CenteredCell>
                  <SwapButton>Swap</SwapButton>
                </CenteredCell>
              </Cell>
            </Row>
          ))}


        </tbody>
      </VaultsTable>
    </Container>
  );
};
