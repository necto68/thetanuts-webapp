import styled from "styled-components";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const TooltipContainer = styled.div`
  max-width: 165px;
  font-family: Roboto;
`;
export const TableTooltipHeader = styled.div`
  font-family: Roboto;
  font-weight:600;
  font-size:18px;
  margin-bottom:8px;
`;
export const TableTooltipContent = styled.div`
  font-family: Roboto;
  font-size:14px;
  margin-bottom:5px;
`;

export const InfoIconDiv = styled(InfoOutlinedIcon)`
  color:white;
  cursor:pointer;
  width:20px;
  margin-top:2px
`;

export const InfoIconDivPopup = styled(InfoOutlinedIcon)`
  cursor:pointer;
  width:20px;
`;

