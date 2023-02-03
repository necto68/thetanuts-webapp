import type { FC } from "react";
import { generatePath } from "react-router-dom";
import { useTheme } from "styled-components";

import { useIndexVault } from "../hooks";
import { numberFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";
import { ModalPathname } from "../../root/types";
import { VaultType } from "../../basic-vault/types";
import { getVaultTypeTitle } from "../helpers";
import type { AppTheme } from "../../app/constants/appTheme";

import { IndexVaultFooter } from "./IndexVaultFooter";

interface IndexVaultProps {
  indexVaultId: string;
}

export const IndexVault: FC<IndexVaultProps> = ({ indexVaultId }) => {
  const { isLoading, data } = useIndexVault(indexVaultId);
  const theme = useTheme() as AppTheme;
  const backgroundColor = theme.bgColor;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    totalPercentageYields,
  } = data ?? {};
  const title = getVaultTypeTitle(type);

  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  const link = {
    pathname: generatePath(ModalPathname.indexVaultModal, {
      vaultId: indexVaultId,
    }),
  };

  return (
    <VaultCard
      apy={formattedTotalAPY}
      backgroundColor={backgroundColor}
      footerContent={<IndexVaultFooter title="Swap" />}
      headerContent={[{ title }]}
      icon={assetLogo}
      isLoading={isLoading}
      link={link}
      shadowColor={backgroundColor}
      subTitle="Stronghold"
      symbol={assetSymbol}
    />
  );
};
