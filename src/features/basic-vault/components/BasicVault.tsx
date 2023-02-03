import type { FC } from "react";
import Big from "big.js";
import { generatePath } from "react-router-dom";
import { useTheme } from "styled-components";

import { useBasicVault } from "../hooks";
import { numberFormatter, periodFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { VaultCard } from "../../vault-card/components";
import { ModalPathname } from "../../root/types";
import { ProgressBarColor, VaultType } from "../types";
import { getVaultTypeTitle } from "../../index-vault/helpers";
import type { AppTheme } from "../../app/constants/appTheme";
import { VaultStatus } from "../../basic-vault-modal/components";

import { BasicVaultCapacity } from "./BasicVaultCapacity";

interface BasicVaultProps {
  basicVaultId: string;
}

export const BasicVault: FC<BasicVaultProps> = ({ basicVaultId }) => {
  const { isLoading, data } = useBasicVault(basicVaultId);
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
      title: getVaultTypeTitle(type),
    },
  ];

  const subTitle = periodFormatter(period);
  const symbol = `${assetSymbol}-${isCallType ? "C" : "P"}`;

  const formattedTotalAPY = numberFormatter.format(annualPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  const pathname = generatePath(ModalPathname.basicVaultModal, {
    vaultId: basicVaultId,
  });

  const link = {
    pathname,
  };

  const progressBarColor =
    type === VaultType.CALL ? ProgressBarColor.blue : ProgressBarColor.orange;

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
