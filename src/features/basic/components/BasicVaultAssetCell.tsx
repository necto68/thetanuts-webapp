import type { FC } from "react";

import { getLogoBySymbol } from "../../logo/helpers";
import { IconContainer } from "../../shared/components";
import type { Vault } from "../../index-vault/types";
import { VaultType } from "../../index-vault/types";
import { useBasicVaultEpochTimerTitle } from "../../basic-vault/hooks/useBasicVaultEpochTimerTitle";

import {
  Container,
  IconsContainer,
  TitlesContainer,
  Title,
} from "./BasicVaultAssetCell.styles";

interface BasicVaultAssetCellProps {
  type: Vault["type"];
  assetSymbol: Vault["assetSymbol"];
  collateralSymbol: Vault["collateralSymbol"];
  expiry: Vault["expiry"];
  isSettled: Vault["isSettled"];
  isExpired: Vault["isExpired"];
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
