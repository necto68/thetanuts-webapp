import { BasicVaultType } from "../../basic/types";

export const loadingButtonTitles = {
  [BasicVaultType.BASIC]: "Initiating Withdraw...",
  [BasicVaultType.DEGEN]: "Initiating Full Withdraw...",
  [BasicVaultType.LENDING_MARKET]: "Closing position...",
};

export const buttonTitles = {
  [BasicVaultType.BASIC]: "Initiate Withdraw",
  [BasicVaultType.DEGEN]: "Initiate Full Withdraw",
  [BasicVaultType.LENDING_MARKET]: "Close Position",
};
