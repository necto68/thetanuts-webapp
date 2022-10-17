import styled from "styled-components";

import { RootContainer } from "../../shared/components/Tooltip.styles";

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const HeaderRow = styled.tr`
  border-bottom: 1px solid #c4c4c4;
`;

export const HeaderCell = styled.th`
  text-align: left;
  font-weight: 400;
`;

export const HeaderCellValue = styled.span`
  font-family: Barlow;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  display: flex;
`;

export const HeaderCellValueCenter = styled(HeaderCellValue)`
  justify-content: center;
`;

export const PortfolioCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

export const CellValue = styled(HeaderCellValue)`
  font-weight: 500;
`;

export const CellValueCenter = styled(CellValue)`
  justify-content: center;
`;

export const CellSubValue = styled(CellValue)`
  font-weight: 500;
  font-size: 11px;
  min-width: 60px;
`;

export const ClaimStatusText = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  color: #ffffff;
  & > ${RootContainer} {
    margin: 0 0 0 4px;
    height: 10px;
    width: 10px;
  }
`;
