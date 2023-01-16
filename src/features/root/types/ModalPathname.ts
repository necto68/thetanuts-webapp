import { VaultModalType } from "./VaultModalType";

export const ModalPathname = {
  indexVaultModal: `/${VaultModalType.index}/:vaultId`,
  basicVaultModal: `/${VaultModalType.basic}/:vaultId`,
  degenVaultModal: `/${VaultModalType.degen}/:vaultId`,
  wheelVaultModal: `/${VaultModalType.wheel}/:vaultId`,
  longVaultModal: `/${VaultModalType.long}/:vaultId`,
} as const;
