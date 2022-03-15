import type { FC, ReactNode } from "react";

import { RootContainer, StyledTooltip, TooltipText } from "./Tooltip.styles";

interface TooltipProps {
  id: string;
  root: ReactNode;
  content: ReactNode | string;
}

export const Tooltip: FC<TooltipProps> = ({ id, root, content }) => (
  <>
    <RootContainer data-for={id} data-tip="">
      {root}
    </RootContainer>
    <StyledTooltip effect="solid" id={id} place="right" type="light">
      {typeof content === "string" ? (
        <TooltipText>{content}</TooltipText>
      ) : (
        content
      )}
    </StyledTooltip>
  </>
);
