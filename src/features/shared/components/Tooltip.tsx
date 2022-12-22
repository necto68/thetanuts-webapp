import type { FC, ReactNode } from "react";
import type { ITooltip } from "react-tooltip";

import { RootContainer, StyledTooltip, TooltipText } from "./Tooltip.styles";

interface TooltipProps extends Pick<ITooltip, "id" | "place"> {
  root: ReactNode;
  content: ReactNode | string;
}

export const Tooltip: FC<TooltipProps> = ({
  id,
  root,
  content,
  place = "right",
}) => (
  <>
    <RootContainer id={id}>{root}</RootContainer>
    <StyledTooltip
      anchorId={id}
      delayHide={100}
      place={place}
      positionStrategy="fixed"
      variant="light"
    >
      {typeof content === "string" ? (
        <TooltipText>{content}</TooltipText>
      ) : (
        content
      )}
    </StyledTooltip>
  </>
);
