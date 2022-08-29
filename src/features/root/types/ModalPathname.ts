import { VaultModalType } from "./VaultModalType";

export const ModalPathname = {
  indexVaultModal: `/${VaultModalType.index}/:vaultId`,
  basicVaultModal: `/${VaultModalType.basic}/:vaultId`,
} as const;
