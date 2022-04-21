import type { FC } from "react";
import { useCallback } from "react";

import { useIndexVault } from "../hooks";
import { useIndexVaultModalState } from "../../index-vault-modal/hooks";
import {
  numberFormatter,
  totalValueLockedFormatter,
} from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";

interface IndexVaultProps {
  indexVaultId: string;
}

export const IndexVault: FC<IndexVaultProps> = ({ indexVaultId }) => {
  const { isLoading, data } = useIndexVault(indexVaultId);

  const [, setModalState] = useIndexVaultModalState();

  const handleVaultClick = useCallback(() => {
    setModalState({ isShow: true, indexVaultId });
  }, [setModalState, indexVaultId]);

  const {
    assetSymbol = "",
    totalPercentageYields,
    totalValueLocked = 0,
  } = data ?? {};

  const { annualPercentageYield = 0 } = totalPercentageYields ?? {};

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);
  const formattedTVL = totalValueLockedFormatter(totalValueLocked);

  const assetLogo = getLogoBySymbol(assetSymbol);

  return (
    <VaultCard
      borderColor="#81e429"
      buttonTitle="SWAP"
      icon={assetLogo}
      isLoading={isLoading}
      leftDataTitle="APY"
      leftDataValue={`${formattedTotalAPY} %`}
      onClick={handleVaultClick}
      rightDataTitle="TVL"
      rightDataValue={formattedTVL}
      subTitle="Stronghold"
      title={assetSymbol}
    />
  );
};
