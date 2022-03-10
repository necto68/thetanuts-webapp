import type { FC, ReactNode } from "react";

import { StyledTooltip, TooltipText } from "./Tooltip.styles";

interface TooltipProps {
  id: string;
  root: ReactNode;
  content: ReactNode | string;
}

export const Tooltip: FC<TooltipProps> = ({ id, root, content }) => (
  <>
    <div data-for={id} data-tip="">
      {root}
    </div>
    <StyledTooltip effect="solid" id={id} place="right" type="light">
      {typeof content === "string" ? (
        <TooltipText>{content}</TooltipText>
      ) : (
        content
      )}
    </StyledTooltip>
  </>
);
