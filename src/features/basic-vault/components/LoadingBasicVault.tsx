import Big from "big.js";

import { VaultCard } from "../../vault-card/components";
import { ProgressBarColor } from "../types";

import { BasicVaultCapacity } from "./BasicVaultCapacity";
import { EpochTimer } from "./EpochTimer";

export const LoadingBasicVault = () => (
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
    shadowColor="#02d1ff"
    subTitle=""
    symbol=""
    title=""
  />
);
