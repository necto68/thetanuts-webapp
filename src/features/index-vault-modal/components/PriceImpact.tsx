import type { FC } from "react";

import { Tooltip } from "../../shared/components";

import { PriceImpactValue } from "./PriceImpact.styles";

interface PriceImpactProps {
  priceImpactRate: number;
  isError?: boolean;
}

export const PriceImpact: FC<PriceImpactProps> = ({
  priceImpactRate,
  isError = false,
}) => (
  <Tooltip
    content="The estimated difference between the USD values of input and output amounts."
    id="priceImpact"
    root={
      <PriceImpactValue
        isError={isError}
      >{`(${priceImpactRate}%)`}</PriceImpactValue>
    }
  />
);
