import { BasicVaultType } from "../../basic/types";

export const loadingButtonTitles = {
  [BasicVaultType.BASIC]: "Canceling...",
  [BasicVaultType.DEGEN]: "Canceling...",
  [BasicVaultType.LENDING_MARKET]: "Canceling...",
};

export const buttonTitles = {
  [BasicVaultType.BASIC]: "Cancel Deposit",
  [BasicVaultType.DEGEN]: "Cancel Deposit",
  [BasicVaultType.LENDING_MARKET]: "Cancel Pending Position",
};
