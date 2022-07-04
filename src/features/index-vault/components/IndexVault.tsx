import type { FC } from "react";
import { generatePath } from "react-router-dom";

import { useIndexVault } from "../hooks";
import { numberFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";
import { VaultType } from "../types";
import { ModalPathname } from "../../root/types";

import { IndexVaultFooter } from "./IndexVaultFooter";

interface IndexVaultProps {
  indexVaultId: string;
}

export const IndexVault: FC<IndexVaultProps> = ({ indexVaultId }) => {
  const { isLoading, data } = useIndexVault(indexVaultId);

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    totalPercentageYields,
  } = data ?? {};

  const title = type === VaultType.CALL ? "Covered Call" : "Put Selling";
  const backgroundColor =
    "linear-gradient(83.93deg, #daef46 0%, #ffb626 28.12%, #1cf9a6 63.02%, #3ff096 100%)";

  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  const url = generatePath(ModalPathname.indexVaultModal, {
    vaultId: indexVaultId,
  });

  return (
    <VaultCard
      apy={formattedTotalAPY}
      backgroundColor={backgroundColor}
      footerContent={<IndexVaultFooter title="SWAP" />}
      icon={assetLogo}
      isLoading={isLoading}
      shadowColor="#ecd236"
      subTitle="Stronghold"
      symbol={assetSymbol}
      title={title}
      url={url}
    />
  );
};
