import styled from "styled-components";
import ReactTooltip from "react-tooltip";

export const RootContainer = styled.div`
  cursor: pointer;
`;

export const StyledTooltip = styled(ReactTooltip)`
  max-width: 25rem;
  opacity: 1 !important;
`;

export const TooltipText = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.4rem;
  color: #000000;
`;
