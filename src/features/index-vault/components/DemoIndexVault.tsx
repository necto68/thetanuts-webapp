import type { FC } from "react";

import {
  numberFormatter,
  totalValueLockedFormatter,
} from "../../shared/helpers";
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

  const {
    assetSymbol = "",
    totalPercentageYields,
    totalValueLocked = 0,
  } = data ?? {};
  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);
  const formattedTVL =
    totalValueLocked > 0 ? totalValueLockedFormatter(totalValueLocked) : "-";

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
      rightDataValue={formattedTVL}
      subTitle="Stronghold"
      title={assetSymbol}
    />
  );
};
