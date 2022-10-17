import { VaultType } from "../../basic-vault/types";

export const getDegenVaultTypeTitle = (type: VaultType): string => {
  switch (type) {
    case VaultType.CALL:
      return "Call Spread";

    case VaultType.PUT:
      return "Put Spread";

    case VaultType.CONDOR:
      return "Iron Condor";

    default:
      return "";
  }
};

export const getDegenVaultTypeShortName = (type: VaultType): string => {
  switch (type) {
    case VaultType.CALL:
      return "Bear";

    case VaultType.PUT:
      return "Bull";

    case VaultType.CONDOR:
      return "Flat";

    default:
      return "";
  }
};

export const getDegenVaultTitle = (type: VaultType) => {
  const typeShortName = getDegenVaultTypeShortName(type);
  const typeTitle = getDegenVaultTypeTitle(type);

  return `${typeShortName} ${typeTitle}`;
};
