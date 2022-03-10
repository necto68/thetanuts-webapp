import ReactTooltip from "react-tooltip";
import type { FC } from "react";

import {
  TooltipContainer,
  TableTooltipHeader,
  TableTooltipContent,
  InfoIconDiv,
  InfoIconDivPopup,
} from "./Tooltip.styles";

interface TooltipProps {
  toolTipId: string;
  data?: string;
  type?: string;
  WPY?: string;
  MPY?: string;
  APR?: string;
  APY?: string;
}

export const Tooltip: FC<TooltipProps> = ({
  toolTipId,
  data,
  type,
  WPY,
  MPY,
  APR,
  APY,
}) =>
  type === "table" ? (
    <>
      <InfoIconDiv data-for={toolTipId} data-tip />
      <ReactTooltip effect="solid" id="tableToolTip" place="right" type="light">
        <TableTooltipHeader>Extrapolated yields</TableTooltipHeader>
        <TableTooltipContent>
          <strong>{WPY}%</strong> WPY (7-days)
        </TableTooltipContent>
        <TableTooltipContent>
          <strong>{MPY}%</strong> MPY (monthly)
        </TableTooltipContent>
        <TableTooltipContent>
          <strong>{APR}%</strong> APR (annually)
        </TableTooltipContent>
        <TableTooltipContent>
          <strong>{APY}%</strong> APY (compounded)
        </TableTooltipContent>
      </ReactTooltip>
    </>
  ) : (
    <>
      <InfoIconDivPopup data-for={toolTipId} data-tip />
      <ReactTooltip effect="solid" id={toolTipId} place="right" type="light">
        <TooltipContainer>{data}</TooltipContainer>
      </ReactTooltip>
    </>
  );
