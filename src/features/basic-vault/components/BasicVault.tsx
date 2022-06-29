import type { FC } from "react";
import Big from "big.js";

import { useBasicVault } from "../hooks";
import { numberFormatter, periodFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";
import { VaultType } from "../../index-vault/types";

import { BasicVaultCapacity } from "./BasicVaultCapacity";
import { EpochTimer } from "./EpochTimer";

interface BasicVaultProps {
  basicVaultId: string;
}

export const BasicVault: FC<BasicVaultProps> = ({ basicVaultId }) => {
  const { isLoading, data } = useBasicVault(basicVaultId);

  // const [, setModalState] = useIndexVaultModalState();

  // const handleVaultClick = useCallback(() => {
  //   setModalState({ isShow: true, basicVaultId });
  // }, [setModalState, basicVaultId]);
  // const handleVaultClick = () => null;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
    annualPercentageYield = 0,
    period = 0,
    balance = new Big(0),
    collatCap = new Big(0),
    expiry = 0,
    isExpired = false,
    isSettled = false,
  } = data ?? {};

  const isCallType = type === VaultType.CALL;

  const title = isCallType ? "Covered Call" : "Put Selling";
  const subTitle = periodFormatter(period);
  const symbol = `${assetSymbol}-${isCallType ? "C" : "P"}`;

  const vaultBackgroundColor = isCallType ? "#02d1ff" : "#fe9902";
  const backgroundColor = isLoading ? "#ffffff" : vaultBackgroundColor;

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  return (
    <VaultCard
      apy={formattedTotalAPY}
      backgroundColor={backgroundColor}
      content={
        <BasicVaultCapacity
          balance={balance}
          collatCap={collatCap}
          collateralSymbol={collateralSymbol}
          type={type}
        />
      }
      footerContent={
        <EpochTimer
          expiry={expiry}
          isExpired={isExpired}
          isSettled={isSettled}
        />
      }
      icon={assetLogo}
      isLoading={isLoading}
      shadowColor={backgroundColor}
      subTitle={subTitle}
      symbol={symbol}
      title={title}
    />
  );
};
