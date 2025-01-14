import type { FC } from "react";
import Big from "big.js";
import { generatePath } from "react-router-dom";
import { useTheme } from "styled-components";

import { highYieldFormatter, numberFormatter } from "../../shared/helpers";
import { getLogoBySymbol } from "../../logo/helpers";
import { DegenVaultCard } from "../../vault-card/components";
import { ModalPathname } from "../../root/types";
import { ProgressBarColor, VaultType } from "../../basic-vault/types";
import { getDegenVaultTypeShortName, getDegenVaultTitle } from "../helpers";
import { BasicVaultCapacity } from "../../basic-vault/components";
import { useBasicVault } from "../../basic-vault/hooks";
import type { AppTheme } from "../../app/constants/appTheme";
import { VaultStatus } from "../../basic-vault-modal/components";

interface DegenVaultProps {
  degenVaultId: string;
}

export const DegenVault: FC<DegenVaultProps> = ({ degenVaultId }) => {
  const { isLoading, data } = useBasicVault(degenVaultId);

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
    annualPercentageYield = 0,
    percentageYields: { periodPercentageYield = 0 } = {},
    balance = new Big(0),
    collatCap = new Big(0),
    expiry = 0,
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  const vaultTypeShortName = getDegenVaultTypeShortName(type);

  const headerContent = [
    {
      title: getDegenVaultTitle(type),
    },
  ];

  const symbol = assetSymbol;

  const theme = useTheme() as AppTheme;
  const { warningColor, bgColor: backgroundColor } = theme;

  const formattedTotalAPY = highYieldFormatter(annualPercentageYield);
  const formattedPeriodYield = numberFormatter.format(periodPercentageYield);

  const assetLogo = getLogoBySymbol(assetSymbol);

  const pathname = generatePath(ModalPathname.degenVaultModal, {
    vaultId: degenVaultId,
  });

  const link = {
    pathname,
  };

  const progressBarColor = ProgressBarColor.red;

  return (
    <DegenVaultCard
      apy={formattedTotalAPY}
      backgroundColor={backgroundColor}
      borderColor={warningColor}
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
          isLoading={false}
          isSettled={isSettled}
        />
      }
      headerContent={headerContent}
      icon={assetLogo}
      isLoading={isLoading}
      link={link}
      periodYield={formattedPeriodYield}
      shadowColor={backgroundColor}
      subTitle={vaultTypeShortName}
      symbol={symbol}
    />
  );
};
