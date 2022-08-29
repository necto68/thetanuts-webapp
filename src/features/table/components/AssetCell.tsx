import type { FC } from "react";

import { getLogoBySymbol } from "../../logo/helpers";
import { IconContainer } from "../../shared/components";

import { Container, IconsContainer, CellValue } from "./AssetCell.styles";

interface AssetCellProps {
  assetSymbol: string;
  collateralSymbol?: string;
}

export const AssetCell: FC<AssetCellProps> = ({
  assetSymbol,
  collateralSymbol,
}) => {
  const assetLogo = getLogoBySymbol(assetSymbol);
  const collateralLogo = collateralSymbol
    ? getLogoBySymbol(collateralSymbol)
    : null;

  const title = collateralSymbol ?? assetSymbol;

  return (
    <Container>
      <IconsContainer>
        {collateralLogo ? (
          <IconContainer height={25} width={25}>
            {collateralLogo}
          </IconContainer>
        ) : null}
        <IconContainer height={25} width={25}>
          {assetLogo}
        </IconContainer>
      </IconsContainer>
      <CellValue>{title}</CellValue>
    </Container>
  );
};
