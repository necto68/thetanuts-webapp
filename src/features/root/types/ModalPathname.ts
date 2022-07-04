import { VaultModalType } from "./VaultModalType";

export const ModalPathname = {
  indexVaultModal: `/${VaultModalType.stronghold}/:vaultId`,
  basicVaultModal: `/${VaultModalType.basic}/:vaultId`,
} as const;
