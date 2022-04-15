import type { FC, ReactNode } from "react";
import type { Place } from "react-tooltip";

import { RootContainer, StyledTooltip, TooltipText } from "./Tooltip.styles";

interface TooltipProps {
  id: string;
  root: ReactNode;
  content: ReactNode | string;
  place?: Place;
}

export const Tooltip: FC<TooltipProps> = ({
  id,
  root,
  content,
  place = "right",
}) => (
  <>
    <RootContainer data-for={id} data-tip="">
      {root}
    </RootContainer>
    <StyledTooltip effect="solid" id={id} place={place} type="light">
      {typeof content === "string" ? (
        <TooltipText>{content}</TooltipText>
      ) : (
        content
      )}
    </StyledTooltip>
  </>
);
