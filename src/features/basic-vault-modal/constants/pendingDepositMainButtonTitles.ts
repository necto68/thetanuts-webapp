import { BasicVaultType } from "../../basic/types";

export const loadingButtonTitles = {
  [BasicVaultType.BASIC]: "Canceling...",
  [BasicVaultType.DEGEN]: "Canceling...",
  [BasicVaultType.WHEEL]: "Canceling...",
  [BasicVaultType.LONG]: "Canceling...",
};

export const buttonTitles = {
  [BasicVaultType.BASIC]: "Cancel Deposit",
  [BasicVaultType.DEGEN]: "Cancel Deposit",
  [BasicVaultType.WHEEL]: "Cancel Deposit",
  [BasicVaultType.LONG]: "Cancel Pending Position",
};
