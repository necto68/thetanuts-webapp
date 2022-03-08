import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import type { FC } from "react";

import {
    TooltipContainer,
    TableTooltipHeader,
    TableTooltipContent,
    InfoIconDiv,
    InfoIconDivPopup
} from "./Tooltip.styles";

interface TooltipProps {
    toolTipId:string;
    data?:string; 
    type?:string;
    WPY?:string;
    MPY?:string;
    APR?:string;
    APY?:string;
}

export const Tooltip: FC<TooltipProps> = ({toolTipId, data, type, WPY, MPY, APR, APY}) => {
  return (
      <div>
          {type==='table'? 
            <div>
            <InfoIconDiv data-tip data-for={toolTipId} />
            <ReactTooltip id="tableToolTip" place="right" type="light" effect="solid">
                <TableTooltipHeader>Extrapolated yields</TableTooltipHeader>
                <TableTooltipContent><strong>{WPY}%</strong> WPY (7-days)</TableTooltipContent>
                <TableTooltipContent><strong>{MPY}%</strong> MPY (monthly)</TableTooltipContent>
                <TableTooltipContent><strong>{APR}%</strong> APR (annually)</TableTooltipContent>
                <TableTooltipContent><strong>{APY}%</strong> APY (compounded)</TableTooltipContent>
            </ReactTooltip>

            </div> 
            :
            <div>
                <InfoIconDivPopup data-tip data-for={toolTipId} />
                <ReactTooltip id={toolTipId} place="right" type="light" effect="solid" >
                    <TooltipContainer>
                        {data}
                    </TooltipContainer>
                </ReactTooltip>
            </div>
            }

            

            


            
      </div>
      


  );
};
