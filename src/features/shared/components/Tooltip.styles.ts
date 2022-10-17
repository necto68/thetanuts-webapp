import styled from "styled-components";
import ReactTooltip from "react-tooltip";

export const RootContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

export const StyledTooltip = styled(ReactTooltip)`
  max-width: 250px;
  opacity: 1 !important;
  pointer-events: auto !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

  &:hover {
    visibility: visible !important;
  }
`;

export const TooltipText = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;
