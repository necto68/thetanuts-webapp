import type { FC } from "react";

import { numberFormatter, currencyFormatter } from "../../shared/helpers";
import { CellValue, CellValueContainer } from "../../table/components";
import type { CollateralAsset } from "../types";

type CurrentPositionCellProps = Pick<
  CollateralAsset,
  "aTokenBalance" | "collateralPrice"
>;

export const CurrentPositionCell: FC<CurrentPositionCellProps> = ({
  aTokenBalance,
  collateralPrice,
}) => {
  if (!aTokenBalance) {
    return <CellValue>-</CellValue>;
  }

  const priceValue = aTokenBalance.mul(collateralPrice).toNumber();

  const formattedBalance = numberFormatter.format(aTokenBalance.toNumber());
  const formattedPrice = currencyFormatter.format(priceValue);

  return (
    <CellValueContainer>
      <CellValue>{formattedBalance}</CellValue>
      <CellValue>{`(${formattedPrice})`}</CellValue>
    </CellValueContainer>
  );
};
