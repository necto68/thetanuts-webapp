import type { FC } from "react";
import Big from "big.js";
import { generatePath } from "react-router-dom";
import { useTheme } from "styled-components";

import { useBasicVault } from "../../basic-vault/hooks";
import { numberFormatter, periodFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";
import { ModalPathname } from "../../root/types";
import { ProgressBarColor, VaultType } from "../../basic-vault/types";
import { getVaultTypeTitle } from "../../index-vault/helpers";
import type { AppTheme } from "../../app/constants/appTheme";
import { VaultStatus } from "../../basic-vault-modal/components";
import { BasicVaultCapacity } from "../../basic-vault/components/BasicVaultCapacity";

interface WheelVaultProps {
  wheelVaultId: string;
}

export const WheelVault: FC<WheelVaultProps> = ({ wheelVaultId }) => {
  const { isLoading, data } = useBasicVault(wheelVaultId);
  const theme = useTheme() as AppTheme;
  const backgroundColor = theme.bgColor;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
    annualPercentageYield = 0,
    period = 0,
    balance = new Big(0),
    collatCap = new Big(0),
    expiry = 0,
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  const isCallType = type === VaultType.CALL;

  const headerContent = [
    {
      title: getVaultTypeTitle(VaultType.CALL),

      backgroundColor: type === VaultType.CALL ? "#17B579" : theme.transparent,
    },
    {
      title: getVaultTypeTitle(VaultType.PUT),

      backgroundColor: type === VaultType.PUT ? "#17B579" : theme.transparent,
    },
  ];

  const subTitle = periodFormatter(period);
  const symbol = `${assetSymbol}-${isCallType ? "C" : "P"}`;

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  const pathname = generatePath(ModalPathname.wheelVaultModal, {
    vaultId: wheelVaultId,
  });

  const link = {
    pathname,
  };

  const progressBarColor = ProgressBarColor.green;

  return (
    <VaultCard
      apy={formattedTotalAPY}
      backgroundColor={backgroundColor}
      content={
        <BasicVaultCapacity
          balance={balance}
          collatCap={collatCap}
          collateralSymbol={collateralSymbol}
          progressBarColor={progressBarColor}
        />
      }
      footerContent={
        <VaultStatus
          expiry={expiry}
          isAllowInteractions={isAllowInteractions}
          isExpired={isExpired}
          isLoading={isLoading}
          isSettled={isSettled}
        />
      }
      headerContent={headerContent}
      icon={assetLogo}
      isLoading={isLoading}
      link={link}
      shadowColor={backgroundColor}
      subTitle={subTitle}
      symbol={symbol}
    />
  );
};
