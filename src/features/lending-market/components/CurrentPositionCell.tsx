import type { FC } from "react";

import { numberFormatter, currencyFormatter } from "../../shared/helpers";
import { CellValue, CellValueContainer } from "../../table/components";
import type { CollateralAsset } from "../types";

interface CurrentPositionCellProps
  extends Pick<CollateralAsset["aToken"], "balance">,
    Pick<CollateralAsset, "collateralPrice"> {}

export const CurrentPositionCell: FC<CurrentPositionCellProps> = ({
  balance,
  collateralPrice,
}) => {
  if (!balance) {
    return <CellValue>-</CellValue>;
  }

  const priceValue = balance.mul(collateralPrice).toNumber();

  const formattedBalance = numberFormatter.format(balance.toNumber());
  const formattedPrice = currencyFormatter.format(priceValue);

  return (
    <CellValueContainer>
      <CellValue>{formattedBalance}</CellValue>
      <CellValue>{`(${formattedPrice})`}</CellValue>
    </CellValueContainer>
  );
};
