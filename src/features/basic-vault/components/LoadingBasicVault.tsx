import Big from "big.js";
import { useTheme } from "styled-components";

import { VaultCard } from "../../vault-card/components";
import { ProgressBarColor } from "../types";
import type { AppTheme } from "../../app/constants/appTheme";

import { BasicVaultCapacity } from "./BasicVaultCapacity";
import { EpochTimer } from "./EpochTimer";

export const LoadingBasicVault = () => {
  const theme = useTheme() as AppTheme;

  const backgroundColor = theme.bgColor;

  return (
    <VaultCard
      apy=""
      backgroundColor="#ffffff"
      content={
        <BasicVaultCapacity
          balance={new Big(0)}
          collatCap={new Big(0)}
          collateralSymbol=""
          progressBarColor={ProgressBarColor.blue}
        />
      }
      footerContent={
        <EpochTimer
          expiry={0}
          isAllowInteractions={false}
          isExpired={false}
          isSettled={false}
        />
      }
      icon={null}
      isLoading
      link=""
      shadowColor={backgroundColor}
      subTitle=""
      symbol=""
      title=""
    />
  );
};
