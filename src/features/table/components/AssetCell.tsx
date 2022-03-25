import type { FC } from "react";

import { getLogoBySymbol } from "../../logo/helpers";
import { IconContainer } from "../../shared/components";

import { Container, CellValue } from "./AssetCell.styles";

interface AssetCellProps {
  assetSymbol: string;
}

export const AssetCell: FC<AssetCellProps> = ({ assetSymbol }) => {
  const assetLogo = getLogoBySymbol(assetSymbol);

  return (
    <Container>
      <IconContainer height={25} width={25}>
        {assetLogo}
      </IconContainer>
      <CellValue>{assetSymbol}</CellValue>
    </Container>
  );
};
