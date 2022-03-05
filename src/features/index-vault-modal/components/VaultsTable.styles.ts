import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const HeaderRow = styled.tr`
  border-bottom: 1px solid #c4c4c4;
`;

export const HeaderCell = styled.th`
  text-align: left;
`;

export const HeaderCellValue = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
`;

export const PortfolioCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

export const CellValue = styled(HeaderCellValue)`
  font-weight: 400;
`;

export const CellSubValue = styled(CellValue)`
  font-size: 12px;
`;