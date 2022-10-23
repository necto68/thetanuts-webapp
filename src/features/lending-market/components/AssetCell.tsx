import type { FC } from "react";

import { getLogoBySymbol } from "../../logo/helpers";
import { IconContainer } from "../../shared/components";
import { Container, CellValue } from "../../table/components/AssetCell.styles";
import type { CollateralAsset } from "../types";

type AssetCellProps = Pick<CollateralAsset["collateralToken"], "symbol">;

export const AssetCell: FC<AssetCellProps> = ({ symbol }) => {
  const assetLogo = getLogoBySymbol(symbol);

  return (
    <Container>
      <IconContainer height={25} width={25}>
        {assetLogo}
      </IconContainer>
      <CellValue>{symbol}</CellValue>
    </Container>
  );
};
