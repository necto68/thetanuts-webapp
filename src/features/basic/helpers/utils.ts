import { VaultModalType } from "../../root/types";
import { BasicVaultType } from "../types";

export const getVaultModalType = (
  basicVaultType: BasicVaultType
): VaultModalType => {
  switch (basicVaultType) {
    case BasicVaultType.BASIC:
      return VaultModalType.basic;
    case BasicVaultType.DEGEN:
      return VaultModalType.degen;
    case BasicVaultType.LENDING_MARKET:
      return VaultModalType.lendingMarket;
    default:
      return VaultModalType.basic;
  }
};
