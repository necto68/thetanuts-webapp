import type { FC, ReactNode } from "react";
import type { TooltipProps as BaseTooltipProps } from "react-tooltip";

import { RootContainer, StyledTooltip, TooltipText } from "./Tooltip.styles";

interface TooltipProps extends Pick<BaseTooltipProps, "id" | "place"> {
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
    <RootContainer data-for={id} data-tip="">
      {root}
    </RootContainer>
    <StyledTooltip
      delayHide={100}
      effect="solid"
      id={id}
      place={place}
      type="light"
    >
      {typeof content === "string" ? (
        <TooltipText>{content}</TooltipText>
      ) : (
        content
      )}
    </StyledTooltip>
  </>
);
