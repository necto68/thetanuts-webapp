import type { FC } from "react";

import { getLogoBySymbol } from "../../logo/helpers";
import { IconContainer } from "../../shared/components";
import { useBasicVaultEpochTimerTitle } from "../../basic-vault/hooks/useBasicVaultEpochTimerTitle";
import type { BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";

import {
  Container,
  IconsContainer,
  TitlesContainer,
  Title,
} from "./BasicVaultAssetCell.styles";

interface BasicVaultAssetCellProps {
  type: BasicVault["type"];
  assetSymbol: BasicVault["assetSymbol"];
  collateralSymbol: BasicVault["collateralSymbol"];
  expiry: BasicVault["expiry"];
  isSettled: BasicVault["isSettled"];
  isExpired: BasicVault["isExpired"];
}

export const BasicVaultAssetCell: FC<BasicVaultAssetCellProps> = ({
  type,
  assetSymbol,
  collateralSymbol,
  expiry,
  isSettled,
  isExpired,
}) => {
  const isPutType = type === VaultType.PUT;

  const assetLogo = getLogoBySymbol(assetSymbol);
  const collateralAssetLogo = getLogoBySymbol(collateralSymbol);

  const title = isPutType
    ? `${collateralSymbol}-${assetSymbol}-P`
    : `${collateralSymbol}-C`;
  const timerTitle = useBasicVaultEpochTimerTitle(expiry, isExpired, isSettled);

  return (
    <Container>
      <IconsContainer>
        <IconContainer height={25} width={25}>
          {collateralAssetLogo}
        </IconContainer>
        {isPutType ? (
          <IconContainer height={25} width={25}>
            {assetLogo}
          </IconContainer>
        ) : null}
      </IconsContainer>
      <TitlesContainer>
        <Title>{title}</Title>
        <Title>{timerTitle}</Title>
      </TitlesContainer>
    </Container>
  );
};
