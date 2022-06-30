import type { FC } from "react";

import { numberFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";
import { demoIndexVaults } from "../../theta-index/constants";

import { IndexVaultFooter } from "./IndexVaultFooter";

interface DemoIndexVaultProps {
  demoIndexVaultId: string;
}

export const DemoIndexVault: FC<DemoIndexVaultProps> = ({
  demoIndexVaultId,
}) => {
  const data = demoIndexVaults.find(({ id }) => id === demoIndexVaultId);

  const { assetSymbol = "", totalPercentageYields } = data ?? {};
  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const backgroundColor =
    "linear-gradient(83.93deg, #daef46 0%, #ffb626 28.12%, #1cf9a6 63.02%, #3ff096 100%)";

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  return (
    <VaultCard
      apy={formattedTotalAPY}
      backgroundColor={backgroundColor}
      disabled
      footerContent={<IndexVaultFooter title="Coming Soon" />}
      icon={assetLogo}
      subTitle="Stronghold"
      symbol={assetSymbol}
      title="Put Selling"
    />
  );
};
