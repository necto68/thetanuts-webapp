// @ts-nocheck

import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { FC } from "react";

import {
    TooltipContainer,
    TableTooltipHeader,
    TableTooltipContent
} from "./Tooltip.styles";

interface TooltipProps {
    toolTipId:string;
    data?:string; 
    color?:string; 
    type?:string;
    WPY?:string;
    MPY?:string;
    APR?:string;
    APY?:string;
}


export const Tooltip: FC<TooltipProps> = ({toolTipId, data, color, type, WPY, MPY, APR, APY}) => {
  return (
      <div>
          {type==='table'? 
            <div>
            <InfoOutlinedIcon data-tip data-for={toolTipId} style={{color:'white', cursor:'pointer',width:'20px'}} />
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
                <InfoOutlinedIcon data-tip data-for={toolTipId} style={{color:color, cursor:'pointer',width:'20px'}} />
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
