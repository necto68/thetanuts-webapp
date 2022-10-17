import type { FC } from "react";

import { getLogoBySymbol } from "../../logo/helpers";
import { IconContainer } from "../../shared/components";
import { useBasicVaultEpochTimerTitle } from "../../basic-vault/hooks/useBasicVaultEpochTimerTitle";
import type { BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";
import { BasicVaultType } from "../types";
import { getVaultTitle } from "../../table/helpers";
import { VaultModalType } from "../../root/types";

import {
  Container,
  IconsContainer,
  TitlesContainer,
  Title,
} from "./BasicVaultAssetCell.styles";

type BasicVaultAssetCellProps = Pick<
  BasicVault,
  | "assetSymbol"
  | "basicVaultType"
  | "collateralSymbol"
  | "expiry"
  | "isAllowInteractions"
  | "isExpired"
  | "isSettled"
  | "type"
>;

export const BasicVaultAssetCell: FC<BasicVaultAssetCellProps> = ({
  basicVaultType,
  type,
  assetSymbol,
  collateralSymbol,
  expiry,
  isSettled,
  isExpired,
  isAllowInteractions,
}) => {
  const isDegenOrPutType =
    basicVaultType === BasicVaultType.DEGEN || type === VaultType.PUT;

  const assetLogo = getLogoBySymbol(assetSymbol);
  const collateralAssetLogo = getLogoBySymbol(collateralSymbol);

  const vaultType =
    basicVaultType === BasicVaultType.DEGEN
      ? VaultModalType.degen
      : VaultModalType.basic;
  const title = getVaultTitle(vaultType, type, assetSymbol, collateralSymbol);

  const timerTitle = useBasicVaultEpochTimerTitle(
    expiry,
    isSettled,
    isExpired,
    isAllowInteractions
  );

  return (
    <Container>
      <IconsContainer>
        <IconContainer height={25} width={25}>
          {collateralAssetLogo}
        </IconContainer>
        {isDegenOrPutType ? (
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
