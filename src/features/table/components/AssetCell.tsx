import type { FC } from "react";

import { VaultType } from "../../basic-vault/types";
import { getLogoBySymbol } from "../../logo/helpers";
import type { BaseRow } from "../../portfolio/types";
import { VaultModalType } from "../../root/types";
import { IconContainer } from "../../shared/components";
import { getVaultTitle } from "../helpers";

import { Container, IconsContainer, CellValue } from "./AssetCell.styles";

type AssetCellProps = Pick<
  BaseRow,
  "assetSymbol" | "collateralSymbol" | "type" | "vaultType"
>;

export const AssetCell: FC<AssetCellProps> = ({
  vaultType,
  type,
  assetSymbol,
  collateralSymbol,
}) => {
  const assetLogo = getLogoBySymbol(assetSymbol);

  const isDegenOrPutType =
    vaultType === VaultModalType.degen ||
    (vaultType === VaultModalType.basic && type === VaultType.PUT);

  const collateralLogo = isDegenOrPutType
    ? getLogoBySymbol(collateralSymbol)
    : null;

  const title = getVaultTitle(vaultType, type, assetSymbol, collateralSymbol);

  return (
    <Container>
      <IconsContainer isPair={Boolean(collateralLogo)}>
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
