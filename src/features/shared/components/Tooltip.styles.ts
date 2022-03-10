import styled from "styled-components";
import ReactTooltip from "react-tooltip";

export const StyledTooltip = styled(ReactTooltip)`
  max-width: 250px;
  opacity: 1 !important;
`;

export const TooltipText = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;
