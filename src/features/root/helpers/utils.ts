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
    case VaultModalType.lendingMarket:
      return ModalPathname.lendingMarketVaultModal;
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
    case VaultModalType.lendingMarket:
      return PagePathname.lendingMarket;
    default:
      return PagePathname.thetaIndex;
  }
};
