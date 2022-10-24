import type { FC } from "react";

import { getLogoBySymbol } from "../../logo/helpers";
import { IconContainer } from "../../shared/components";
import { Container, CellValue } from "../../table/components/AssetCell.styles";
import type { CollateralAsset } from "../types";

type AssetCellProps = Pick<CollateralAsset, "collateralTokenSymbol">;

export const AssetCell: FC<AssetCellProps> = ({ collateralTokenSymbol }) => {
  const assetLogo = getLogoBySymbol(collateralTokenSymbol);

  return (
    <Container>
      <IconContainer height={25} width={25}>
        {assetLogo}
      </IconContainer>
      <CellValue>{collateralTokenSymbol}</CellValue>
    </Container>
  );
};
