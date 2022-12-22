import "react-tooltip/dist/react-tooltip.css";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";

export const RootContainer = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    width: 100%;
    height: 1px;
    border-bottom: 1px solid white;
    border-bottom-style: dotted;
    position: absolute;
    bottom: 0;
  }
`;

export const StyledTooltip = styled(Tooltip)`
  max-width: 250px;
  opacity: 1 !important;
  pointer-events: auto !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  z-index: 1;

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
