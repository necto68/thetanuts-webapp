import type { FC } from "react";

import { numberFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";
import { demoIndexVaults } from "../../theta-index/constants";

interface DemoIndexVaultProps {
  demoIndexVaultId: string;
}

export const DemoIndexVault: FC<DemoIndexVaultProps> = ({
  demoIndexVaultId,
}) => {
  const data = demoIndexVaults.find(({ id }) => id === demoIndexVaultId);

  const { assetSymbol = "", totalPercentageYields } = data ?? {};
  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  return (
    <VaultCard
      borderColor="#81e429"
      buttonTitle="Coming Soon"
      disabled
      icon={assetLogo}
      leftDataTitle="APY"
      leftDataValue={`${formattedTotalAPY} %`}
      rightDataTitle="TVL"
      rightDataValue="-"
      subTitle="Stronghold"
      title={assetSymbol}
    />
  );
};
