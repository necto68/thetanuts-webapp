import { VaultModalType, ModalPathname, PagePathname } from "../types";

export const getModalPathname = (
  modalType: VaultModalType
): typeof ModalPathname[keyof typeof ModalPathname] => {
  switch (modalType) {
    case VaultModalType.index:
      return ModalPathname.indexVaultModal;
    case VaultModalType.basic:
      return ModalPathname.basicVaultModal;
    case VaultModalType.degen:
      return ModalPathname.degenVaultModal;
    case VaultModalType.long:
      return ModalPathname.longVaultModal;
    default:
      return ModalPathname.indexVaultModal;
  }
};

export const getPagePathname = (modalType: VaultModalType): PagePathname => {
  switch (modalType) {
    case VaultModalType.index:
      return PagePathname.thetaIndex;
    case VaultModalType.basic:
      return PagePathname.basic;
    case VaultModalType.degen:
      return PagePathname.degen;
    case VaultModalType.long:
      return PagePathname.long;
    default:
      return PagePathname.thetaIndex;
  }
};
